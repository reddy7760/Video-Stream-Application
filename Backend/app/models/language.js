const mongoose = require('mongoose');
const Schema  = mongoose.Schema

const languageSchema = new Schema({
    name:{
        type:String,
        unique:true,
    }

})
const Language = mongoose.model('Language',languageSchema)

module.exports = {
    Language
}