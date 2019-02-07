const mongoose = require('mongoose')
const Schema  = mongoose.Schema
const commentSchema = new Schema({
    comment:{
        type:String,
        minlength:1,
        maxlength:1000,
        required:true
    },
    video:{
        type:Schema.Types.ObjectId,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId
    }
    // createdAt:{
    //     type:Date,
    //     default:Date.now
    // }
})
const Comment = mongoose.model('Comment',commentSchema);
 module.exports={
    Comment
}