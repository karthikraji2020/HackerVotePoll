const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Hacker = require('./models/hacker');
const nodemailer = require('nodemailer');
const $env = process.env;
router.get('/hackers', (req, res) => {
  Hacker.find().then(rec => {
    if(rec) {
      res.send(rec);
    } else {
      res.send([]); 
    }
  })
});
// create candidate  by Admin
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
// candidate vote by User

router.put('/hackers/:id/vote', function(req, res) {
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

// candidate Delete by Id
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
});

var clubhousefacade_transporter = getTransporter($env.EMAIL_CLUBHOUSEFACADE ,$env.PASSWORD_CLUBHOUSEFACADE);
//  credentials 
function getTransporter(email ,password)  {
  let transporter=  nodemailer.createTransport({
       service: 'gmail',
       auth: {
         user: email,
         pass: password
       }});
       return transporter;
 }
 function getMailOptions({email ,to ,fname,lname, subject, message,phonenumber} ) {
  let mailOptions = {
      from:email,
      // organisation Email 
      to,
      subject:`Hi Clubhouse Facade ----${subject}--`,
      text:message,
      phonenumber,
      html: `<h1>${message}</h1><p>That was easy! name ${fname} ${lname} ${phonenumber}</p>`

  };
    return mailOptions;
    
}



router.post("/clubhousefacadeemailservice", function(req, res) {
  let resBody = {
      fname :req.body.fname,
      lname :req.body.lname,
      email :req.body.email,
      phonenumber :req.body.phonenumber,
      to : $env.EMAIL_CLUBHOUSEFACADE,
      subject :req.body.subject,
      message :req.body.message,
  }
  console.log(req.body);
  console.log(resBody);
  var clubhousefacade_mailOptions = getMailOptions(resBody);

  clubhousefacade_transporter.sendMail(clubhousefacade_mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.send("Email Sent Successfully");
      }
    });
  console.log(`${port} is working`);
});

module.exports = router;
