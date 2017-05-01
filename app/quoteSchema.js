const mongoose = require('mongoose');

module.exports = mongoose.Schema({
  quote_id: Number,
  quote: String,
  fullquote: String
});