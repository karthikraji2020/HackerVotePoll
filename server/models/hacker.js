  
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  Name: { type: String, required: true },
  NoOfChallengesSolved: { type: String, required: true },
  Votes: { type: Number, default: 0},
  ExpertIn:{
    DataStructure:{ type: Number, default: 0},
    Algorithims:{ type: Number, default: 0},
    DataStructure:{ type: Number, default: 0},
    Cpp:{ type: Number, default: 0},
    Java:{ type: Number, default: 0},
    Pyton:{ type: Number, default: 0}
  } 
});

module.exports = mongoose.model('Hacker', schema);