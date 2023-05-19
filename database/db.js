const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_DB_CONNECTION_URL = process.env.MONGO_DB_CONNECTION_URL

// create database connectioon
function connectToDb() {
    mongoose.connect(MONGO_DB_CONNECTION_URL || 'http://localhost:3000')

    mongoose.connection.on("connected", () => {
        console.log("connected to MongoDb Successfully");
    })

    mongoose.connection.on("error", (err) => {
        console.log(err, "An error occured while connecting to the MongoDb")
    })
}

module.exports = { connectToDb };