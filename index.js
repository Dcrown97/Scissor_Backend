require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/authRoute');
const urlsRouter = require('./routes/urlRoute');
const { connectToDb } = require('./database/db')

require("./authentication/auth") // jwt authorization middleware

const app = express()

const PORT = process.env.PORT || 3000

//connect to databse
connectToDb();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(limiter);
// app.use(handleRateLimitExceeded);

// Apply the CORS middleware
app.use(cors());


//routes
app.use('/api', authRoute);
app.use('/', urlsRouter);

//Diplay Homepage
app.get('/', (req, res) => {
    return res.send('Hello, Welocome to Brief URLs')
})

// Handle errors.
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({ error: err.message });
});

app.listen(PORT, () => {

    console.log(`Server Started on PORT: http://localhost:${PORT}`)
})