require('dotenv').config();
const express = require('express');
const authRoute = require('./routes/authRoute');
const { connectToDb } = require('./database/db')

require("./authentication/auth") // jwt authorization middleware

const app = express()

const PORT = process.env.PORT || 3000

//connect to databse
connectToDb();

//middleware
app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


//routes
app.use('/', authRoute);

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