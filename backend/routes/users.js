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
const upload=multer({storage:storage});
router.post('/upload',upload.single('myfile'),function(req,res,next){
  console.log(req.file);
  x=req.file;
  res.status(204).send();
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
          if(user.sub!=='empty'){
            async function fun(){
              const subscription =await stripe.subscriptions.retrieve(
                user.sub
              );
              if(subscription.plan.active===true){
                res.json({success: true, status:'true'});
              }
              else{
                res.json({success: true, status:'false'});
              }
            }
          fun();
          }
          else{
            res.json({success: true, status:'false'});
          }
        });
      }
      else{
        res.statusCode = 401;
         res.setHeader('Content-Type', 'application/json');
        res.json({success:false});
      }
  })
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
