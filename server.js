var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

var apiRoutes = require('./routers/api');

var app = express();

app.use(bodyParser.urlencoded());
//Add our JWT middleware here

var secrets = require('./secrets');

//Add our routers here
app.use('/api', apiRoutes);

mongoose.connect(secrets.DATABASE_URL);
var db = mongoose.connection;

var server = app.listen(1337, function(){
  db.once('open', function(){
    console.log('API server listening at 1337');
  });
});