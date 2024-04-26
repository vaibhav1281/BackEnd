// What is wrong in the below code?
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

exports.createComment = async (req, res) => {
  try {
    const { post, user, body } = req.body;

    const comment = new Comment({
      post,
      user,
      body,
    });
    const savedComment = await comment.save();

    const updatedPost = await Post.findByIdAndUpdate(
      post,
      {
        $push: {
          comments: savedComment._id,
        },
      },
      { new: true }
    )
      .populate("comments") // Ensure this matches the field name in your schema
      .exec();

    res.json({
      post: updatedPost,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
