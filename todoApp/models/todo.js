const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
 title: {
    type: String,
    required: [true, "Please add a Title"],
    maxLength: [50, "Title can not be more than 50 characters"],
 },
 description: {
    type: String,
    required: true,
    maxLength: 2000,
 },
 createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
 },
 updatedAt: {
    type: Date,
    default: Date.now(),
    required: true,
 },
});

module.exports = mongoose.model("Todo", todoSchema);
