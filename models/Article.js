const mongoose = require('mongoose');

const { Schema } = mongoose;
// Create Schema
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  tags: {
    type: Object,
  },
  userName: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: Date.now
  },
  likedUsers: {
    type: Array,
    default: []
  }
});
const Article = mongoose.model('articles', ArticleSchema);
module.exports = Article;