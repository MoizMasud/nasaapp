const express=require('express');
const router=express.Router();
const passport=require('passport');
const jwt =require('jsonwebtoken');
const Collection=require('../models/collection');
const config=require('../config/database');

router.post('/postcollections', (req, res, next) => {
  //create a new collection for the database
  let newCollection= new Collection({
    createdBy:req.body.createdBy,
    name:req.body.name,//get from the postman
    images:req.body.images,
    isPrivate:req.body.isPrivate,
    discription:req.body.discription,
    date:req.body.date,
    rating:req.body.rating
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


router.get('/allcollections',(req,res,next)=>{
  Collection.find((err, CollectionSchema)=>{
    if(err){throw err;}
    res.json({success:true,CollectionSchema,msg:"Collections returned"});
  });
});

router.get('/mycollections',(req, res,next) => {
 Collection.find(({createdBy:req.query.createdBy}), (err,Collections)=>{
   if(err){
     res.json({success:false,msg:'Failed to find collection'});
   }else{
     res.json({success:true,Collections,msg:'Collection Found'});
   }
 })
});
//ALWAYS NEED THIS!
module.exports=router;
