const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema;


var quizSchema = new mongoose.Schema({
      id: Number,
      name: String,
      author:String,
      questions: [{
           id : Number,
           name : String,
           questionTypeId:Number,
           options:  [{
                 id: Number,
                 questionId: Number,
                 name: String,
                 isAnswer: Boolean
            }],
            questionType:{
             id:Number,
             name: String,
             isActive: Boolean   
            }
         }]
}); 

module.exports = mongoose.model('quiz',quizSchema);