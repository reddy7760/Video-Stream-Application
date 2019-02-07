const express = require ('express');
const app = express();
const cors = require('cors');

app.use(cors())

const {mongoose} = require('./config/db');
const {genreController} = require('./app/controllers/genre-controller')
const {languageController} = require('./app/controllers/language-controller')
const {videoController} = require('./app/controllers/video-controller');
// const {awsController} = require('./app/controllers/aws-controller')
const {userController} = require('./app/controllers/user-controller')
const {commentController} = require('./app/controllers/comment-controller');
const port = 3003;
app.use(express.json());

app.get('/', (req,res) =>{
    res.send('welcome to the site')
})

app.use('/admin/language', languageController);
app.use('/admin/genre', genreController);
app.use('/admin/video', videoController);
// app.use('/admin/video', awsController);
app.use('/user',userController)
app.use('/comments',commentController)

app.listen(port,()=>{console.log('listening to port', port)});