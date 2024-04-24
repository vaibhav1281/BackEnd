// Import the Todo model from the models directory
const Todo = require("../models/todo");

// Define an asynchronous function to create a new todo item
exports.createTodo = async (req, res) => {
  // Use a try-catch block to handle any errors that may occur
  try {
    // Destructure the title and description properties from the request body
    const { title, description } = req.body;

    // Use the Todo model to create a new todo item with the title and description from the request body
    const response = await Todo.create({ title, description });

    // Send a response with a 200 status code, a success message, the created todo item, and a success message
    res.status(200).json({
      success: true,
      data: response,
      message: "Created successfully",
    });
  } catch (err) {
    // If there is an error, log the error to the console and send a response with a 500 status code, a failure message, and the error message
    console.log(err);
    console.error(err);
    res.status(500).json({
      success: false,
      data: "internal server error",
      message: err.message,
    });
  }
};