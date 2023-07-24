const db = require("../config/connection");

const Schema = db.Schema;

const userSchema = new Schema({
  avatar: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },

}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  },
});

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  },
});

const postSchema = new Schema({
  slug: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  },
});

const User = db.model('User', userSchema);
const Category = db.model('Category', categorySchema);
const Post = db.model('Post', postSchema);

module.exports = {
  User,
  Category,
  Post
};