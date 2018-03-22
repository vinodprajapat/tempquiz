const mongoose = require(' mongoose');
mongoose.promise= global.promise;


var commentSchema= new mongoose.Schema({

    quizid: Number,
    comments:[{
        username: String,
        comment:[{
            commentid:Number,
            comment: String,
            replies:[{
                user: String,
                reply:String 
            }]
        }]
    }]
});

module.exports = mongoose.model('comments',commentSchema); 