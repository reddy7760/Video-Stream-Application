const express = require('express');
const router = express.Router()

const { Language } = require('../models/language');


router.get('/', (req,res) => {
  Language.find().then( allLanguages =>{
      res.send(allLanguages);
  }).catch( err => res.send(err));
})

router.get('/:id',(req,res) => {
    let id = req.params.id;
    Language.findById(id).then(language => {
        res.send(language)
    }).catch(err => res.send(err))
});

router.post('/', (req,res) => {
    let body = req.body;
    let language = new Language(body);
    language.save().then(language => {   
        res.send({
            message: 'successfully added language',
            language
        });
    }).catch( err => res.send(err))
});

router.delete('/:id',(req,res) => {
    let id = req.params.id;
    Language.findByIdAndDelete(id).then(language => {
        res.send({
            message: 'Successfully deleted',
            language
        });
    }).catch( err => res.send(err));
});

router.put('/edit/:id', (req,res) => {
    let id = req.params.id;
    let body = req.body;
    
    Language.findByIdAndUpdate(id, {$set: body}, {new:true}).then(language => {
        res.send({
            message: 'Successfully Updated',
            language
        });
    }).catch( err => res.send(err));
});

module.exports={
    languageController : router
}