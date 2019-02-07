const express  = require('express');
const router = express.Router();

const { Genre } = require('../models/genre');



router.get('/',(req,res) => {
    Genre.find().then(allGenre => {
        res.send(allGenre);
    }).catch(err => res.send(err)); 
});

router.get('/:id',(req,res) => {
    let id = req.params.id;
    Genre.findById(id).then(genre => {
        res.send(genre)
    }).catch(err => res.send(err))
});

router.post('/',(req,res) => {
    let body = req.body;
    let genre  = new Genre(body);
    genre.save().then( genre => {
        res.send({
            message: 'successfully added genre',
            genre
        });
    }).catch(err => res.send(err));
});

router.delete('/:id',(req,res) => {
    let id = req.params.id;
    Genre.findByIdAndDelete(id).then(genre => {
        res.send({
            message: 'Successfully deleted',
            genre
        });
    }).catch( err => res.send(err));
});

router.put('/edit/:id', (req,res) => {
    let id = req.params.id;
    let body = req.body;
    
    Genre.findByIdAndUpdate(id, {$set: body}, {new:true}).then(genre => {
        res.send({
            message: 'Successfully Updated',
            genre
        });
    }).catch( err => res.send(err));
});
  
module.exports = {
    genreController : router
}