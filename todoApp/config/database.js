// Import the mongoose library
const mongoose = require("mongoose");

// Load environment variables from.env file
require("dotenv").config();

// Set the database URL from the environment variable
const dbUrl = process.env.DATABASE_URL;

// Define a function to connect to the database
const connectToDataBase = () => {
  // Use mongoose to connect to the database using the URL and options
  mongoose
   .connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    // If the connection is successful, log a message to the console
   .then(() => console.log("Connected to MongoDB"))

    // If there is an error connecting to the database, log an error message and the error to the console, and exit the process
   .catch((error) => {
      console.log("Error: Failed to connect to MongoDB", error);
      console.error(error);
      process.exit(1);
    });
};

// Export the connectToDataBase function so it can be used in other files
module.exports = connectToDataBase;