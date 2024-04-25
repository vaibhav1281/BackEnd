// Import the express library and create a new router instance
const express = require('express');
const router = express.Router();

// Import the createTodo function from the createTodo controller
const { createTodo } = require('../controllers/createTodo');
const { getTodo, getTodoById } = require('../controllers/getTodo')
const { updateTodo } = require('../controllers/updateTodo')
const { deleteTodo } = require('../controllers/deleteTodo')

// Define a route for POST requests to /createTodo that handles the request using the createTodo function
router.post('/createTodo', createTodo);
// Define a route for GET requests to /getTodos that handles the request using the getTodos function
router.get('/getTodos', getTodo)

router.get('/getTodos/:id', getTodoById)

router.put('/updateTodo/:id', updateTodo)

router.delete('/deleteTodo/:id',deleteTodo)

// Export the router so it can be used in other files
module.exports = router;