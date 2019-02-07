const express = require('express');
const router = express.Router()
const { User } = require('../models/user')

router.get('/',function(req,res){
    User.find().then((user)=>res.send(user)).catch((err)=>res.send(err))
    // res.send('hello');
})

router.post('/',function(req,res){
    let body = req.body;
    let user = new User(body)

  return  user.save().then((function(user){
        return user.generateToken()
    }))
    .then(function(token){
        res.header('x-auth',token).send()//header property 
    })
    .catch(function(err){
        res.send(err);
    })
})
router.post('/login',function(req,res){
    let body = req.body;
    User.findByCredentials(body.email,body.password).then((user) => user.generateToken())//instance method
    .then((token)=>
        res.header('x-auth',token).send({notice:"successfully logged in"}))
    .catch((err)=>
        res.status(401).send(err))
})
router.get('/:id',function(req,res){
    let id = req.params.id;
    User.findById(id)
    .then(user=>res.send(user))
    .catch( err=>res.send(err))
})
router.delete('/:id',function(req,res){
    let id = req.params.id;
    User.findByIdAndDelete(id)
    .then(()=>res.send({
        notice:"successfully deleted"
     }))
})

router.put('/:id',function(req,res){
    let id = req.params.id;
    User.findByIdAndUpdate(id).then(user=>res.send({
        notice:" user is successfully updated",
        user
     } ))
    .catch(err=>res.status(401,err).send())
})
module.exports={
    userController : router
}