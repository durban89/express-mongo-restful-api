'use strict';

let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let config = require('config');

//mongo db
mongoose.connect(config.mongo.host, config.mongo.options);
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'mongo connection error:'))

//dont show the log when it is test
if(config.util.getEnv('NODE_ENV') != 'test'){
  app.use(morgan('combined'));
}

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/json'}));

//default route path
app.get("/" ,(req, res) => res.json({message: "Welcome to our BookStore"}));

app.use("/books", require('./routes/book'));

app.listen(config.port);
console.log("Listening on port "+ config.port);
module.exports = app;