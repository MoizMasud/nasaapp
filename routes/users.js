const express=require('express');
const router=express.Router();
const passport=require('passport');
const jwt =require('jsonwebtoken');
const User=require('../models/user');
const config=require('../config/database')
const mailer=require('nodemailer')

//insted of app.get now it's router.get
// const transporter = mailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_PASS,
//   },
// });

//This route is localhost:3000/users/register
router.post('/register', (req, res, next) => {
  //create a new users
  let newUser= new User({
    name:req.body.name,//get from the form
    email:req.body.email,
    username:req.body.username,
    password:req.body.password// this is a plain text password, when it runs through bcrypt it gets hashed and goes into the database
  });

//add the user to the user model, display some message letting the user know if hes added or not
  User.addUser(newUser,(err,user)=>{
    if(err){
      res.json({success:false, msg:'Failed to register user'});
    }else{
      res.json({success:true,msg:'User registered'});
    //   try{
    //     const emailToken=jwt.sign(
    //       {
    //       user:_.pick(user,'id'),
    //     },EMAIL_SECRET,
    //     {
    //       expiresIn: '1d',
    //     },
    //     );
    //
    //
    //   const url='http://localhost:3000/confirmation/${emailToken}';
    //
    // await transporter.sendMail({
    //   to: req.body.email,
    //   subject:'Confirm Email',
    //   html:'Please click this: <a href="${url}">${url}</a>'
    // });
    // }catch(e){console.log(e);}


    }
  });
});

router.get('/confirmation/:token', async (req, res) => {
  try {
    const { user: { id } } = jwt.verify(req.params.token, EMAIL_SECRET);
    await models.User.update({ confirmed: true }, { where: { id } });
  } catch (e) {
    res.send('error');
  }

  return res.redirect('http://localhost:4200/login');
});

//authentication
router.post('/authenticate', (req, res, next) => {
//get the user name and passowrd thats being submitted
const username=req.body.username;
const password=req.body.password;

//get user by username from database
User.getUserByUsername(username,(err,user)=>{
  if(err)throw err;
  if(!user){//if there is not a user returned, then we want to send a response to the client
    return res.json({success:false,msg:'User not found'});
  }
  if(!user.confirmed){
    return res.json({success:false,msg:'Please confirm your email'});
  }




  //if there is a user, compare the entered password with the user password
  User.comparePassword(password,user.password,(err,isMatch)=>{
    if(err)throw err;
    if(isMatch){//if the password is correct, create a token
      const token=jwt.sign({data:user},config.secret,{
        expiresIn: 604800,//user is kept login in for a week and then logged out
      });

      //a response to the front end from database if the password matches
      res.json({
        success:true,//worked, they validated
        token:'JWT ' + token,
        user:{
          id: user._id,
          name: user.name,
          username:user.username,
          email:user.email
        }
      });
    }
    //a response to the front end if the password doesnt match
    else{
      return res.json({success:false, msg:'Wrong Password'});
    }
  });
});
});

//profile, adding passport.authenticate(..) helps us protected that route to a single user
router.get('/profile', passport.authenticate('jwt',{session:false}),(req, res,next) => {
 res.json({user: req.user});
});



//EXPORT IT so we can use it outside of this
module.exports=router;
