const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://localhost:27017/video-stream',{ useNewUrlParser: true }).then(() => {
    console.log('connected to db on mongodb://localhost:27017/video-stream');
}).catch((err)=>{
    console.log('err connecting to db',err)
})

module.exports = {
    mongoose
}

//mangoose- npm install --save mongoose
//odm - object data model
// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

// mongoose.set('useCreateIndex', true);//use this to avoid warning 'DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead' (not necessery while configuring)

// mongoose.connect('mongodb://localhost:27017/sept-ecommerce',{
//  useNewUrlParser: true}).then(function(){
//      console.log('connected to db');
//  }).catch(function(err){
//      console.log('error connecting to db',err);
//  })
// module.exports = {
//     mongoose
// }     