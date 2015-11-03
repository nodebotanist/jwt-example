var express = require('express');
var router = express.Router();
var Cat = require('../models/cat');

router.get('/cats', function(req, res){
  Cat.find(function(err, cats){
    if(err) res.status(500).json('{}');

    res.status(200).json(cats);
  });
});

router.post('/cat', function(req,res){
  var newCat = Cat({
    name: req.body.name,
    age: req.body.age,
    color: req.body.color
  });

  newCat.save(function(err, cat){
    if(err) res.status(400).send(err);

    res.status(201).json(cat);
  });
});

router.put('/cat', function(req, res){
  var updates = {};

  if(req.body.name){
    updates.name = req.body.name;
  }
  if(req.body.color){
    updates.color = req.body.color;
  }
  if(req.body.age){
    updates.age = req.body.age;
  }

  Cat.update({ "_id": req.body.id }, updates, function(err, cat){
    if(err) res.status(500).json(err);

    res.status(200).json(cat);
  });
});

router.delete('/cat', function(req, res){
  Cat.remove({"_id": req.body.id}, function(err){
    if(err) res.status(500).send();

    res.status(200).send();
  })
});

module.exports = router;
