// schemat quizu

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
  title: {type: String, required: true},
  vote: {type: Number, required: true, default: 0},
})

// eksportujemy, deklaracja nazwy modelu
module.exports = mongoose.model('Quiz', quizSchema)