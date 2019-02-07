const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const stream = require('stream');

// const s3 = require('../../config/s3');
const {Video} = require('../models/video');

let storage = multer.memoryStorage();
let upload = multer({storage: storage});

const env = {
    AWS_ACCESS_KEY: 'AKIAJPMGSY3IZ2MK7OQA' ,
    AWS_SECRET_ACESS_KEY: '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',
    REGION: 'us-east-1' ,
    Bucket: 'video-stream-application-bucket-1',
    ACL: 'bucket-owner-full-control'
}

const s3Client = new AWS.S3 ({
    accessKeyId: env.AWS_ACCESS_KEY,
    secretAccessKey: env.AWS_SECRET_ACESS_KEY,
    region: env.REGION
})

function ParamsUpload(key,body){
    this.ACL =  env.ACL;
    this.Bucket =  env.Bucket;
    this.Key = key;
    this.Body = body;
}

let imageData = {}, videoData = {};

s3Upload = (req,res,next) => {

    const uploadParams1 = new ParamsUpload(req.files.image[0].originalname,req.files.image[0].buffer)
    const uploadParams2 = new ParamsUpload(req.files.video[0].originalname,req.files.video[0].buffer)
    //console.log(uploadParams1,uploadParams2)
//---------------------------------------------------------
    // this is not working

    // let promiseForImage = s3Client.upload(uploadParams1);
    // let promiseForVideo = s3Client.upload(uploadParams2);

    // Promise.all([promiseForImage,promiseForVideo]).then(value => {
    //     console.log(value);
    // })
//----------------------------------------------------------

    const s3Uploader = (file) => {
        return new Promise((resolve, reject) => {
        s3Client.upload(file, (err, data) => {
            console.log(err);
        if (err) {
             reject(err)
        }
            resolve(data)
            });
        })
    }

    Promise.all([s3Uploader(uploadParams1), s3Uploader(uploadParams2)]).then((values) => {
        console.log(values)
        
        imageData = values[0];
        videoData = values[1];
        //console.log(imageData,'------------',videoData)
        next()
       
    })
    
    

//----------------------------------------------------------------
//not an appropriate method to upload multiple files   
    // s3Client.upload(uploadParams1, (err, data) => {
	// 	if (err) {
	// 		res.status(500).send({error:"Error -> " + err});
    //     }
    //     path = data;
    //     res.send({
    //         message: 'File uploaded successfully!',
    //         data
    //     });
        
	// });
		
	// s3Client.upload(uploadParams2, (err, data) => {
	// 	if (err) {
	// 		res.status(500).send({error:"Error -> " + err});
    //     }
    //     path = data;
    //     res.send({
    //         message: 'File uploaded successfully!',
    //         data
    //     });
    //     next()
    // });
//-----------------------------------------------------------------
}

mongoUpload =(req,res) => {
    let uploadData = {
        title: req.body.title,
        description: req.body.description,
        image: imageData.Location,
        video: videoData.Location,
        language:req.body.language,
        genre: req.body.genre
    };
    // console.log(uploadData)

    let video = new Video(uploadData);
    video.save().then( video => {
        res.send({
            message: 'successfully added video to database',
            video
        });
    }).catch( err => res.send(err));
}

router.post('/',upload.fields([{name: 'image', maxCount:1}, {name: 'video', maxCount:1}]), s3Upload, mongoUpload);

module.exports = {
    awsController: router
};
