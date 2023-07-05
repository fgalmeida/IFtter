const connection = require("../config/connection");

let PostSchema = new connection.Schema(
  {
    slug: String,
    title: String,
    description: String,
    content: String,
    author: String,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = connection.model("Post", PostSchema);
