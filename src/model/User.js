const db = require("../config/connection");

let UserSchema = new db.Schema(
  {
    avatar: String,
    username: String,
    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
      unique: true,
    },
    password: String,
    posts: [
      {
        type: db.Schema.Types.ObjectId,
        ref: "Post",
        comments: [
          {
            type: db.Schema.Types.ObjectId,
            ref: "User",
          },
        ],
      },
    ],
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = db.model("User", UserSchema);
