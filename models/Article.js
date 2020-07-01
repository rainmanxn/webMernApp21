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
  skills: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now
  }
});
const Article = mongoose.model('articles', ArticleSchema);
module.exports = Article;