const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 1000
    },
    image:{
        type: String,
        required:true,
        unique:true
    },
    video:{
        type: String,
        required: true,
        unique: true
    },
    language: {
        type: Schema.Types.ObjectId,
        required: true,
        
    },
    genre: {
        type: Schema.Types.ObjectId,
        required: true
    }
    
})

const Video = mongoose.model('Video', videoSchema);

module.exports ={
    Video
}