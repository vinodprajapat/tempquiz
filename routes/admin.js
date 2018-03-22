// some of user functionalities are also implemnted in last

var express = require('express');
var router = express.Router();
const quiz = require('../models/quiz');
const User= require('../models/user');
const comments=require('../model/comment');

router.get('/quiz/:id', function(req, res, next) {
  quiz.find({id:req.params.id},{_id:0},function(err, quizdetail){

      console.log("control in get id  method ");
      if(err){
          res.send(err);
      }
     // res.send(quizdetail);
     console.log(quizdetail);
      res.json(quizdetail);
  });
})


// get All quiz detail
router.get('/quiz', function(req, res, next) {
  quiz.find({},{_id:0},function(err, quizdetail){

      console.log("control in get method ");
      if(err){
          res.send(err);
      }
     console.log(quizdetail);
      res.json(quizdetail);
  });
})

router.post('/addquiz', function(req,res,next){
 
 var newquestions=[{}];

  newquestions =req.body.questions.map((e)=>{
      
      var newoptions=[];
      newoptions=e.options.map((op)=>{

    let option={
          id:op.id,
          questionId:op.questionId,
          name:op.name,
          isAnswer:op.isAnswer,
          }
      return option;
      });

   let qs={
       id:e.id,
       name:e.name,
       questionTypeId:e.questionTypeId,
       options:newoptions,
       questiontype:e.questiontype
      }
    
     return qs; 
    });

    
 quiz.count({}, function(err, n){
      if(err)
      console.log("error in saving "+ err);
      else{
         var newquiz= new quiz({
         id:n+1,
         name:req.body.name,
         author:req.body.author,
         questions:newquestions
     });

 newquiz.save(function(err, quiz){
                 if(err){
                   res.send(err);
                   }
                  res.json(newquiz);
                 });
           }
  });


});


router.delete('/deletequiz/:id', function(req, res,next){
    quiz.remove({id:req.params.id}, function(err,task){
   if(err){
        res.send(err);
    }
    console.log("quiz data deleted");
    res.json(task);
    });
});


router.post('/addscore', (req,res)=>{      
    var userscore={
     id: req.body.id,
     name: req.body.name,
     score: req.body.score,
     time: req.body.date
   }
  

  User.findOneAndUpdate({username: req.body.username  }, {$push: {attempted_quizes: userscore }}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!" + err);
    }
   console.log(" data is saved");
    console.log(doc);
});

});


router.post('/addcomment', (req, res )=>{

    var comment={
        user: req.body.username,
        comment:req.body.comment
    }
    
    comments.findOneAndUpdate({quizid: req.body.quizid},{$push:{comments:comment}}, (err, doc)=>{
        if(err){
            console.log(" Something wrong "+ err);
        }
        res.json(doc);

    })
})


// router.post('/addreply', (req, res)=>{
//     var commentsfromUser=[];
//     comments.find({quizid: req.body.quizid},(err, allcomment)=>{
//         if(err){
//             console.log(" Something wrong "+ err); 
//         }
//         else{
        
//             this.commentsfromUser=allcomment.find(comment=> comment.username == req.body.username)
//         }
//     })
// })

module.exports=router;
