var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('express-jwt');
var token = require('jsonwebtoken');

var apiRoutes = require('./routers/api');

var app = express();

app.use(bodyParser.urlencoded());
//Add our JWT middleware here
app.use(jwt({ secret: 'nyancat 4 ever'}).unless({path: ['/login']}));

var User = require('./models/user');

app.post('/login', function(req, res){
  if(!req.body.username){
    res.status(400).send('username required');
    return;
  }
  if(!req.body.password){
    res.status(400).send('password required');
    return;
  }

  User.findOne({username: req.body.username}, function(err, user){
    user.comparePassword(req.body.password, function(err, isMatch) {
        if (err) throw err;
        if(!isMatch){
          res.status(401).send('Invalid Password');
        } else {
          var myToken = token.sign({ user: req.body.username }, 'nyancat 4 ever');
          res.status(200).json(myToken);
        }
    });
  });

});

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