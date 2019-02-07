const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs')
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
        minlength:10,
        maxlength:10
    },
    tokens:[{
        token:{
            type:String
        }
    }],
    gender:{
        type:String,
        required:true
    },
    dateofbirth:{
        type:String,
        required:true
    },
    usertype:{
        type:String,
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})
//instance method
userSchema.methods.generateToken = function(){
    let user = this;
    // console.log(user);
    let tokenData = {
        userId:this._id
    }
    let jwtToken = jwt.sign(tokenData,'secret1234')
    user.tokens.push({ token: jwtToken });

    return user.save().then(function(user){
        return jwtToken
    })
}
userSchema.pre('save',function(next){
    let user = this;
    if(user.isNew){
    bcryptjs.genSalt(10).then(function(salt){
        bcryptjs.hash(user.password,salt).then(function(encrypted){
            user.password = encrypted
            next()
        })
    }).catch(function(err){
        console.log(err);
    })
}
else{
    next();
}
});
userSchema.statics.findByCredentials =function(email,password){
    let User = this
  return  User.findOne({email:email}).then(function(user){
        if(!user){
            return Promise.reject('email or password is incorrect ');
        }

          return  bcryptjs.compare(password,user.password).then((res)=>{
                if(res){
                    return Promise.resolve(user)
                }
                else{
                    return Promise.reject('incorrect email or password');
                }
            })
    })
} 
const User = mongoose.model('User',userSchema)
module.exports={
    User
}