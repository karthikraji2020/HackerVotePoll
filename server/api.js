const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Hacker = require('./models/hacker');

router.get('/hackers', (req, res) => {
  Hacker.find().then(rec => {
    if(rec) {
      res.send(rec);
    } else {
      res.send([]); 
    }
  })
});

router.post('/hacker', function(req, res) {

  const hacker = new Hacker({
    _id: mongoose.Types.ObjectId(),
    Name: req.body.Name,
    NoOfChallengesSolved: req.body.NoOfChallengesSolved,
    ExpertIn:{
      DataStructure: req.body.ExpertIn.DataStructure,
      Algorithims: req.body.ExpertIn.Algorithims,
      Cpp: req.body.ExpertIn.Cpp,
      Java: req.body.ExpertIn.Java,
      Pyton: req.body.ExpertIn.Pyton,
    } 
  })
  console.log(req.body.Name);
  hacker.save(function(err, rec) {
    if(err) {
      return res.status(400).send("error while creting a post")
    }
    console.log(rec);
    res.send(rec);
  })
});

router.put('/hackers/:id/upvote', function(req, res) {
  Hacker.findById(req.params.id, function(err, rec) {
    if(err) {
      return res.status(400).send("cannot find the post with given id")
    }
    if(!rec) {
      return res.status(404).send("Hacker not found")
    }
    rec.Votes = rec.Votes + 1;
    rec.save();
    res.send(rec);
  })
})

router.put('/hackers/:id/downvote', function(req, res) {
  Hacker.findById(req.params.id, function(err, rec) {
    if(err) {
      return res.status(400).send("cannot find the post with given id")
    }
    if(!rec) {
      return res.status(404).send("Hacker not found")
    }
    rec.Votes = rec.Votes - 1;
    rec.save();
    res.send(rec);
  })
})

router.delete('/hackers/:id', function(req, res) {
  Hacker.deleteOne({_id: req.params.id}, function(err, rec) {
    if(err) {
      return res.status(400).send("error while deleting a user")
    }
    if(!rec) {
      return res.status(404).send("user not found")
    }
    res.send(rec);
  })
})

module.exports = router;