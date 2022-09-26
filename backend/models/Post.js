const { model, Schema } = require("mongoose");

const commentSchema = new Schema({
  body: String,
  username: String,
  createdAt: String
})

const postSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  userId: String,
  likeCount: Number,
  comments: [commentSchema],
  comment: commentSchema,
  commentCount: Number,
  likes: [
    {
      username: String,
      createdAt: String,
      userId: String
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("Post", postSchema);
//module.exports = model("Comment", commentSchema)
