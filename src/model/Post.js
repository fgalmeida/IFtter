const db = require("../config/connection");

let PostSchema = new db.Schema(
  {
    thumb: String,
    slug: String,
    title: String,
    description: String,
    content: String,
    author: { type: db.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = db.model("Post", PostSchema);
