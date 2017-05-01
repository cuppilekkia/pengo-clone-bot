const mongoose = require('mongoose'),
      quoteSchema = require('../app/quoteSchema'),
      Quote = mongoose.model('Quote', quoteSchema);

var quotes = [
  {
    quote: "Care About Your Craft",
    fullquote: "Why spend your life developing software unless you care about doing it well?"
  },
  {
    quote: "Provide Options, Don’t Make Lame Excuses",
    fullquote: "Instead of excuses, provide options. Don’t say it can’t be done; explain what can be done."
  },
  {
    quote: "Be a Catalyst for Change",
    fullquote: "You can’t force change on people. Instead, show them how the future might be and help them participate in creating it."
  }
];

var allQuotes = [];
quotes.forEach(function(element, index) {
  allQuotes[index] = {
    quote_id      : index,
    quote         : element.quote,
    fullquote      : element.fullquote
  };
});

Quote.remove({}, function(err) {
  if (err) console.log(err);
  console.log("database emptied.");
});

Quote.create(allQuotes, function (err, results) {
  if (err) console.log(err);
  console.log("database populated:");
  console.log(results);
});
