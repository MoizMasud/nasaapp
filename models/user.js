// a model for users, holds all the fields and types of field(name,password,email,username)
//also functions that interct with the database

const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const config=require('../config/database');

//USER SCHEMA
const UserSchema=mongoose.Schema({
  name: {
    type: String,
  },
  email:{
    type:String,
    required:true //an email is required
  },
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },

  confirmed:{
    type:Boolean,
    default: false
  }, //account wont be activated until we set this to true

  tempToken:{
    type:String,
    required:true
  }
});

//exporting the model.
const User=module.exports=mongoose.model('User',UserSchema);
//create two basic functions
//get user by id, and get user by username.
//module.exports allows us to call the functions outside this file.
module.exports.getUserById=function(id,callback){
  User.findById(id, callback)
}

module.exports.getUserByUsername=function(username,callback){
  const query={username:username}
  User.findOne(query, callback)
}



//hash the password using genSalt(), genSalt generates a random key
module.exports.addUser=function(newUser,callback){
  //10 rounds
  bcrypt.genSalt(10,(err,salt)=>{
    //take the password that is submitted in the form and into the newUser object, and hash it
    bcrypt.hash(newUser.password,salt,(err,hash)=>{
      if(err)throw err;
      newUser.password=hash;
      newUser.save(callback);//save the user.
    })
  });
}


module.exports.comparePassword=function(canidatePassword,hash,callback){
  bcrypt.compare(canidatePassword,hash,(err,isMatch)=>{
    if(err)throw err;
    callback(null,isMatch);
  });
}
