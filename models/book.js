const mongoose = require('mongoose')

const collection = 'books'

var BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
}, { collection })

module.exports = mongoose.model('Book', BookSchema)