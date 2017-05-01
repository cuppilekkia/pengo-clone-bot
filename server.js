// server.js
"use strict";
// init project
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      //DB = require('./app/DB'),
      GetQuote = require('./app/GetQuote');
      
// DB connect
// Standard URI format: mongodb://[dbuser:dbpassword@]host:port/dbname, details set in .env
const MONGODB_URI = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.DB_PORT+'/'+process.env.DB;
let collection;

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Db connected successfully');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


app.post("/", function (request, response) {
  let payload = request.body;
  
  // Random quote //
  
  if (payload.text === "") {
    GetQuote.random(function(err, res){
      if(err) console.error(err);
      let message = {
        "response_type": "in_channel",
        "text": res.quote,
        "attachments": [
          {
            "text": res.fullquote,
            "color": "good"
          }
        ] 
      };
      response.send(message);
    });
  } 
  
  // Help command 
  else if (payload.text === "help") {
    let message = {
      "text":`
        Pengo-clone Help, type:
        /pengo-clone - to get a random quote
        /pengo-clone [ID] - to get a specific quote by ID
        /pengo-clone rant - to get a very important advice
      `
    }
    response.send(message);
  } 
  
  // Rant command
  else if (payload.text === "rant") {
    let message = {
      "response_type": "in_channel",
      "attachments": [
        {
          "image_url": "https://pengo.herokuapp.com/rant.png",
          "color": "warning"
        }
      ]
    }
    response.send(message);
  } 
  
  // Quote by ID command
  else if (Number.isInteger(Number(payload.text))) {
    let id = Number(payload.text);
    GetQuote.id(id, function(err, res){
      if (err) console.error(err);
      if (res.custom) {
        let message = {
          "response_type": "ephemeral",
          "text": res.text
        };
        response.send(message);
      } else {
        let message = {
          "response_type": "in_channel",
          "text": res.quote,
          "attachments": [
            {
              "text": res.fullquote,
              "color": "good"
            }
          ] 
        };
        response.send(message);
      }
    });
  } else {
  
    /*console.log(payload); */
    let message = {
      "response_type": "ephemeral",
      "text": "Wrong command!",
      "attachments": [
          {
              "text":"Please use /pengo-clone help"
          }
      ]
    };
    response.send(message);
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

