const express = require("express");
const connectToMongoDB = require("./config/database");
require("dotenv").config();

const blog = require('./routes/blog');

const app = express();

const PORT = process.env.PORT || 1234;
app.use(express.json());

// Mount the Routes
app.use("/api/v1", blog);

// Connect to MongoDB database
connectToMongoDB();

app.get("/", (req, res) => {
 res.send(`<h2>Hello world this is BlogApp server</h2>`);
});

app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});
