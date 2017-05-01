const mongoose = require('mongoose'),
      quoteSchema = require('../app/quoteSchema'),
      Quote = mongoose.model('Quote', quoteSchema);

const GetQuote = {
  random: function(callback) {
    Quote.count({}, function(err, count) {
      if (err) callback(err);
      var id = Math.floor(Math.random() * count);
      
      Quote.find({quote_id: id}, function(err, res){
        if (err) callback(err);
        callback(null, res[0]);
      });
      
    });
  },
  id: function(id, callback) {
    Quote.count({}, function(err, count) {
      if (err) callback(err);
      if (id <= 0 || id > count) {
        callback(null, {"custom": "Out of range","text": "Wrong ID"});
      } else {
        Quote.find({quote_id: id-1}, function(err, res){
          if (err) callback(err);
          callback(null, res[0]);
        });  
      }
      
    });
    
  }
}

module.exports = GetQuote;