const Todo = require("../models/todo");

exports.getTodo = async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.status(200).json({
      success: true,
      data: todos,
      message: "Get all todo",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Server error",
    });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const id = req.params.id;
    const todoById = await Todo.findById({ _id: id });
    if (!todoById) {
      return res.status(404).json({
        success: false,
        message: "No specific data found with id",
      });
    }
    res.status(200).json({
      success: true,
      data: todoById,
      message: `Get a specific todo by id ${id}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Server Error",
    });
  }
};
