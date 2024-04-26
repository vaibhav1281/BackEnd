const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId, // reference to User model
        ref: "Like"
    }],
    comments: [{ // Changed to lowercase 'c'
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

module.exports = mongoose.model('Post', postSchema);
