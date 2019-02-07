const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const stream = require('stream');
const env= require('../../aws-config')
const {Video} = require('../models/video');

//---------------------------------------------------------------

router.get('/list',(req,res) => {
    Video.find().then( allVideos => {
        res.send(allVideos);
    }).catch( err => res.send(err))
});

//---------------------------------------------------------------

router.get('/:id',(req,res) => {
    let id = req.params.id;
    Video.findById(id).then(video => {
        res.send(video)
    }).catch(err => res.send(err))
});

//---------------------------------------------------------------

let storage = multer.memoryStorage();//multer method memoryStorage which
let upload = multer({storage: storage});



const s3Client = new AWS.S3 ({ // s3Client  creating new object
    accessKeyId: env.AWS_ACCESS_KEY,
    secretAccessKey: env.AWS_SECRET_ACESS_KEY,
    region: env.REGION,
    endpoint: env.endpoint,
    s3BucketEndpoint: env.s3BucketEndpoint
})

function ParamsUpload(key,body){
    this.ACL =  env.ACL;
    this.Bucket =  env.Bucket;
    this.Key = key;
    this.Body = body;
}

let imageData = {}, videoData = {};

s3Upload = (req,res,next) => {

    const uploadParams1 = new ParamsUpload(req.files.image[0].originalname,req.files.image[0].buffer)//buffer will read the file
    const uploadParams2 = new ParamsUpload(req.files.video[0].originalname,req.files.video[0].buffer)
    //console.log(uploadParams1,uploadParams2)

//**********************************************************************//
    // this is not working

    // let promiseForImage = s3Client.upload(uploadParams1);
    // let promiseForVideo = s3Client.upload(uploadParams2);

    // Promise.all([promiseForImage,promiseForVideo]).then(value => {
    //     console.log(value);
    // })
//**********************************************************************//

    const s3Uploader = (file) => {
        return new Promise((resolve, reject) => {
        s3Client.upload(file, (err, data) => {
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
        next() // mongoupload
       
    })
    
    

//**********************************************************************//
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
//**********************************************************************//
}

mongoUpload = (req,res) => {
    console.log(req.body)
    let uploadData = {
        title: req.body.title,
        description: req.body.description,
        image: imageData.Location,
        video: videoData.Location,
        language:req.body.language,
        genre: req.body.genre,
        imageKey: imageData.Key,
        videoKey: videoData.Key
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

//-----------------------------------------------------------------------

let s3DeleteStatus = {};
s3Delete = (req,res,next) => {
    
    let id = req.params.id;
    console.log('hi')
    Video.findById(id).then((video) => {

        let deleteParams = {
            Bucket: "video-stream-application-bucket-1", 
            Delete: {
             Objects: [
                {
               Key: video.imageKey
              }, 
                {
               Key: video.videoKey
              }
             ], 
             Quiet: false
            }
        };

        s3Client.deleteObjects(deleteParams, function(err, data) {
            if (err){
                console.log(err, err.stack); 
            } else {
               
                s3DeleteStatus = data
                next()
            }  
        })
        
    }).catch( err => res.send(err));
    

       
}
router.delete('/:id',s3Delete,(req,res) => {
    let id = req.params.id;
    
    if(s3DeleteStatus.Errors.length == 0 && s3DeleteStatus.Deleted.length == 2){
        Video.findByIdAndDelete(id).then((video) => {
            res.send({
                message: 'Successfully deleted',
                video
            })
        }).catch( err => res.send(err));
    } else {
        res.send('could not delete in s3')
    }
});

//-----------------------------------------------------------------------

router.put('/:id', (req,res) => {
    let id = req.params.id;
    let body = req.body;
    
    Video.findByIdAndUpdate(id, {$set: body}, {new:true}).then(video => {
        res.send({
            message: 'Successfully Updated',
            video
        });
    }).catch( err => res.send(err));
});




module.exports = {
    videoController: router
}