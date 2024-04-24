const express = require('express'); // Importing the express module
const todoRoutes = require('./routes/todoRoutes'); // Importing todo routes from todoRoutes file
const connectToDataBase = require('./config/database'); // Importing database connection from database file

const app = express(); // Creating an instance of express

require("dotenv").config(); // Configuring environment variables
app.use(express.json()); // Enabling JSON parsing middleware

const PORT = process.env.PORT || 1234; // Setting the port number from environment variable or defaulting to 1234

app.use('/api/v1', todoRoutes); // Mounting todo routes at /api/v1 endpoint

app.listen(PORT, () => { // Starting the server
    console.log(`Server is running on port ${PORT}`); // Logging server start message
});

connectToDataBase(); // Connecting to the database

app.get('/', (req,res) => { // Handling GET request at root endpoint
    console.log("Testing of server") // Logging server test message
    res.send(`<h1>testing the server of my app</h1>`); // Sending HTML response
})