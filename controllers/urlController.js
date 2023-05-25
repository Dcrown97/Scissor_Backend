require('dotenv').config();
const Url = require('../model/urlModel');
const Visit = require('../model/visitModel');
const validUrl = require('valid-url')
const shortid = require('shortid')
const requestIp = require('request-ip');
const geoip = require('geoip-lite');
const useragent = require('useragent');

// Short URL Generator
exports.shortUrl = async (req, res) => {
    const { origUrl } = req.body;
    const base = process.env.BASE;

    // const urlId = nanoid();
    const urlId = shortid.generate()
    const baseUrl = origUrl

    // check base url if valid using the validUrl.isUri method
    if (validUrl.isUri(baseUrl)) {
        const user = req.user;
        try {
            let url = await Url.findOne({ origUrl, author: user._id, });
            if (url) {
                res.status(400).json({
                    message: 'Url already exists',
                    url: url,
                    status: 400
                })
            } else {
                const shortUrl = `${base}/${urlId}`;

                let url = new Url({
                    origUrl,
                    shortUrl,
                    urlId,
                    author: req.user._id,
                    date: new Date(),
                });

                // save url to database
                 url = await url.save()
                // return response
                return res.status(200).json({
                    message: "Url shortened successfully",
                    url: url,
                    status: 200
                })

            }
        } catch (err) {
            // console.log(err);
            res.status(500).json({
                message: 'Server Error',
                error: err
            });
        }
    } else {
        // console.log("errror")
        return res.status(400).json({
            message: 'Invalid Original Url'
        });
    }
};

// Custom URL Generator
exports.custom = async (req, res) => {
    const { origUrl, customUrl } = req.body;
    const user = req.user;
    const base = process.env.BASE;
    const baseUrl = origUrl
    const customSlug = customUrl

    // check base url if valid using the validUrl.isUri method
    if (validUrl.isUri(baseUrl)) {
        try {
            let slug = await Url.findOne({ customUrl, author: user._id, });
            if (slug) {
                return res.status(404).json({
                    message: "Custome URl already exist",
                    status: 404
                })
            } else {
                const shortUrl = `${base}/${customSlug}`;
                const url = new Url({
                    urlId: customUrl,
                    origUrl,
                    shortUrl,
                    customUrl: customSlug || '',
                    author: req.user._id,
                    date: new Date(),

                });

                // save url to database
                const newUrl = await url.save()
                // return response
                return res.status(200).json({
                    message: "Custome URl created",
                    newUrl: newUrl,
                    status: 200
                })

            }
        } catch (err) {
            // console.log(err);
            res.status(500).json({
                message: 'Server Error',
                error: err
            });
        }
    } else {
        // console.log("errror")
        return res.status(400).json({
            message: 'Invalid Original Url'
        });
    }
};


exports.redirect = async (req, res) => {
    try {
        const url = await Url.findOne({ urlId: req.params.urlId });
        if (url) {
            await Url.updateOne(
                {
                    urlId: req.params.urlId,
                },
                { $inc: { clicks: 1 } }
            );
            const ipAddress = requestIp.getClientIp(req);
            const getLocation = geoip.lookup(ipAddress);
            let location = `${getLocation?.country}, ${getLocation?.city}, ${getLocation?.region}`
            const userAgentString = req.headers['user-agent'];
            const userAgent = useragent.parse(userAgentString);
            const browserName = userAgent.family;  // Browser name (e.g., Chrome)
            const browserVersion = userAgent.toVersion();  // Browser version (e.g., 94.0.4606.81)
            const osName = userAgent.os.family;  // Operating system name (e.g., Windows)
            const osVersion = userAgent.os.toVersion(); 
            const device = `${browserName} ${browserVersion} on ${osName} ${osVersion}`;
            let visit = new Visit({
                location,
                ipAddress,
                device,
                urlVisitedId: url._id,
                date: new Date(),
            });

            // save url to database
            visit = await visit.save()
            // return response
            return res.redirect(url.origUrl);
        } else res.status(404).json({
            message: 'Not found'
        });
    } catch (err) {
        // console.log(err);
        res.status(500).json({
            message: 'Server Error',
            error: err
        });
    }
};

exports.analytics = async (req, res) => {
    try {
        // geet user from request
        const user = req.user;
        // query the request object
        let { page } = req.query;
        // paginate
        const limit = 5;
        page = page ? page : 1
        // get url that belongs to a author
        const url = await Url.find({ author: user._id, },
        ).limit(limit).skip(+page == 1 ? 0 : (+page - 1) * limit)

        return res.json({ status: 200, url, message: "Success" })

    } catch (err) {
        // console.log(err);
        res.status(500).json({
            message: 'Server Error',
            error: err
        });
    }
};

exports.visit = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        const getUrlVisit = await Visit.find({ urlVisitedId: id })
        const getUrl = await Url.findOne({ _id: id })
        if (!getUrlVisit ) {
            return res.status(404).send('Url Visit not found');
        }
        // return response
        return res.status(200).json({
            status: 200,
            data: getUrlVisit, urlDetail: getUrl,
            message: "Success"
        })

    } catch (err) {
        // console.log(err);
        res.status(500).json({
            message: 'Server Error',
            error: err
        });
    }
};