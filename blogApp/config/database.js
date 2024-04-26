const mongoose = require( 'mongoose' );
require('dotenv').config();

const MONGODB_URL = process.env.MONGODB_URL

const connectToMongoDB = () => {
    mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error(`Error connecting to MongoDB: ${err}`);
        console.log('MongoDB connection failed')
        process.exit(1)
    })
}

module.exports = connectToMongoDB;
