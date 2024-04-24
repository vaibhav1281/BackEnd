// Import the express library and create a new router instance
const express = require('express');
const router = express.Router();

// Import the createTodo function from the createTodo controller
const { createTodo } = require('../controllers/createTodo');

// Define a route for POST requests to /createTodo that handles the request using the createTodo function
router.post('/createTodo', createTodo);

// Export the router so it can be used in other files
module.exports = router;