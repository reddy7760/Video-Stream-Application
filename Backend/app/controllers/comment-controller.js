const express = require('express')
const router = express.Router()
const {Comment} = require('../models/comments')
router.get('/',function(req,res){
    Comment.find().then(comment=>res.send(comment))
    .catch(err=>res.send(err))
})
router.get('/:id',(req,res)=>{
    let id = req.params.id
    Comment.findById(id).then(comment=>res.send(comment))
    .catch((err)=>res.send(err))
})
router.post('/',function(req,res){
    let body = req.body
    let comment = new Comment(body)
comment.save().then(comment=>res.send({
    notice:"comment is being added successfully",
          comment
       }))
.catch((err)=>res.send(err));
})

module.exports={
    commentController:router
}
