const express=require('express');
const router=express.Router();
const passport=require('passport');
const jwt =require('jsonwebtoken');
const Collection=require('../models/collection');
const config=require('../config/database');

router.post('/allcollections', (req, res, next) => {
  //create a new collection for the database
  let newCollection= new Collection({
    name:req.body.name,//get from the postman
    date:req.body.date,
    images:req.body.images
  });
//add to database, and send the response
Collection.addCollection(newCollection,(err,collection)=>{
  if(err){
    res.json({success:false, msg:'Failed to add collection'});
  }else{
    res.json({success:true,msg:'Collection added'});
    }
  });
});
//ALWAYS NEED THIS!
module.exports=router;
