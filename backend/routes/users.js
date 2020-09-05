var express = require('express');
var router = express.Router();
var User=require('../models/user');
var bodyParser=require('body-parser');
var passport=require('passport');
var multer=require('multer');
var GridStorage=require('multer-gridfs-storage');
const { authenticate } = require('passport');
/* GET users listing. */
router.use(bodyParser.json());
var mongoose=require('mongoose');
const { ObjectID, ObjectId } = require('mongodb');
require('dotenv').config();
url="mongodb://localhost:27017/FileUpload";
mongoose.connect(url);
var db=mongoose.connection;
var collection=db.collection('test.files');
var collectionChunks=db.collection('test.chunks');
var storage=GridStorage({
  url,
  file:(req,file)=>{
    return new Promise((resolve,reject)=>{
        const filename=file.originalname;
        x=file.originalname;
        const fileinfo={
            bucketName: 'test',
            filename:filename
        }
        resolve(fileinfo);
      });
  }
});
router.post("/remove",(req,res,next)=>{
  collectionChunks.remove({files_id:ObjectId(`${req.body.ide}`)});
  collection.remove({_id:ObjectId(`${req.body.ide}`)})
  User.findOne({username:"dhruv"})
    .then((user)=>{
      User.update({username:"dhruv"},{
          history:req.body.a,
          sender:req.body.b,
      }, function(err, affected, resp) {
        console.log(resp);
     });
     res.status(204).send();
    })
    .catch((err)=>{
     var err=new Error('Error not sent!!!');
     err.status=403;
     next(err);
    });
})
router.get("/list",(req,res,next)=>{
  var sendhis=[];
  User.findOne({username:"dhruv"})
  .then((user)=>{
      // send=user.sender;
      user.history.map(j=>
        collection.find({filename:j.filename}).toArray(function(err,docs){
          if(err){
            res.end('err');
          }
          else{
           collectionChunks.find({files_id:docs[0]._id}).toArray(function(err,chunk){
              if(err){
                res.end('err data');
              }
              else{
                let fileData=[];
                for(let i=0;i<chunk.length;i++){
                  fileData.push(chunk[i].data.toString('base64'));
                }
                let finalFile=fileData.join('');
                if(docs[0].contentType=='image/jpeg'){
                  sendhis.push("data:image/jpeg;base64,"+finalFile+"");
                }
                else if(docs[0].contentType=='video/mp4'){
                  sendhis.push("data:video/mp4;base64,"+finalFile+"");
                }
                else if(docs[0].contentType=='video/3gpp'){
                  sendhis.push("data:video/3gpp;base64,"+finalFile+"");
                }
                else if(docs[0].contentType=='text/plain'){
                  sendhis.push("data:text/plain;base64,"+finalFile+"");
                }
                else if(docs[0].contentType=='application/octet-stream'){
                  sendhis.push("data:application/octet-stream;base64,"+finalFile+"");
                }
                else if(docs[0].contentType=='application/pdf'){
                  sendhis.push("data:application/pdf;base64,"+finalFile+"");
                }
                else if(docs[0].contentType=='application/postscript'){
                  sendhis.push("data:application/postscript;base64,"+finalFile+"");
                }
                else if(docs[0].contentType=='application/msword'){
                  sendhis.push("data:application/msword;base64,"+finalFile+"");
                }
                else if(docs[0].contentType=='image/gif'){
                  sendhis.push("data:image/gif;base64,"+finalFile+"");
                }
                else if(docs[0].contentType=='application/x-gzip'){
                  sendhis.push("data:application/x-gzip;base64,"+finalFile+"");
                }
                else if(docs[0].contentType=='text/html'){
                  sendhis.push("data:text/html;base64,"+finalFile+"");
                }
                else if(docs[0].contentType=='application/java-archive'){
                  sendhis.push("data:application/java-archive;base64,"+finalFile+"");
                }
                else if(docs[0].contentType=='text/x-java-source'){
                  sendhis.push("data:text/x-java-source;base64,"+finalFile+"");
                }
                else if(docs[0].contentType=='application/javascript'){
                  sendhis.push("data:application/javascript;base64,"+finalFile+"");
                }
                else if(docs[0].contentType=='application/json'){
                  sendhis.push("data:application/json;base64,"+finalFile+"");
                }
                else if(docs[0].contentType=='audio/x-mpegurl'){
                  sendhis.push("data:audio/x-mpegurl;base64,"+finalFile+"");
                }
                else if(docs[0].contentType=='audio/mpeg'){
                  sendhis.push("data:audio/mpeg;base64,"+finalFile+"");
                }
                else if(docs[0].contentType=='application/x-msdownload'){
                  sendhis.push("data:application/x-msdownload;base64,"+finalFile+"");
                }
                else if(docs[0].contentType=='image/png'){
                  sendhis.push("data:image/png;base64,"+finalFile+"");
                }
                else if(docs[0].contentType=='application/vnd.ms-powerpoint'){
                  sendhis.push("data:application/vnd.ms-powerpoint;base64,"+finalFile+"");
                }
                else if(docs[0].contentType=='application/x-rar-compressed'){
                  sendhis.push("data:application/x-rar-compressed;base64,"+finalFile+"");
                }
                else if(docs[0].contentType=='application/x-tar'){
                  sendhis.push("data:application/x-tar;base64,"+finalFile+"");
                }
                else if(docs[0].contentType=='application/zip'){
                  sendhis.push("data:application/zip;base64,"+finalFile+"");
                }
                else{
                  res.end('Not Supported');
                }
              }
            })
          }
        })
        );
        array=[
          {
            sendhistory:sendhis,
            sendername:user
          }
        ]
      setTimeout(() => {
        res.send(array)
      }, 500);
      
  })
  
})
const upload=multer({storage:storage});
router.post('/upload',upload.single('myfile'),function(req,res,next){
  console.log(req.file);
  x=req.file;
  res.send(x);
});
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/signup', (req, res, next) => {
  const user=new User({username: req.body.username,email:req.body.email})
  User.register(user, 
    req.body.password, (err, user) => {
      console.log("hehe");
    if(err) {
      console.log(err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      console.log(user);
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!'});
      });
    }
  });
});
router.get("/profile",(req,res,next)=>{
  User.find({username:req.session.passport.user})
  .then((user)=>{
    res.send(user);
  })
})
router.post('/login', (req, res) => {
  User.findOne({username:req.body.username})
  .then((user)=>{
      if(user){
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
        });
      }
      else{
        res.statusCode = 401;
         res.setHeader('Content-Type', 'application/json');
        res.json({success:false});
      }
  })
});
router.post('/send',function(req,res,next){       
    User.findOne({username:req.body.from})
    .then((user)=>{
      User.update({username:req.body.from},{
          $push: {"history": req.body.x,"sender": req.body.from},
      }, function(err, affected, resp) {
        console.log(resp);
     });
     res.status(204).send();
    })
    .catch((err)=>{
     var err=new Error('Error not sent!!!');
     err.status=403;
     next(err);
    });
 });
router.post('/updatePassword',(req,res,next)=>{
    User.findOne({username:req.session.passport.user})
    .then((user)=>{
      user.changePassword(req.body.oldpass,req.body.newpass,function(err){
        if(err){
          res.send(err);
        }
        user.save();
        res.send("DONE!!");
      });
      })
      .catch((err)=>next(err));
  });
router.get('/logout',(req,res,next)=>{
  req.session.destroy();
  res.clearCookie('session_id');
});
module.exports = router;
