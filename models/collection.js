const mongoose=require('mongoose');
const config=require('../config/database');


//Collection SCHEMA
const CollectionSchema=mongoose.Schema({
  createdBy:{
    type:String,
    required:true
  },
  name: {
    type: String,
    required:true
  },
  date:{
    type:Date,
    required:false
  },
  images:{
    type:[],
    required:false
  },
  isPrivate:{
    type:Boolean,
    required:true
  },
  discription:{
    type:String,
    required:true
  },

  rating:{
    type:String,
    required:false
  }

});

//exporting the model.
const Collection=module.exports=mongoose.model('Collection',CollectionSchema);

module.exports.getCollectionById=function(id,callback){
  Collection.findById(id,callback);

}

module.exports.getCollectionByName=function(name,callback){
  const query = {name:name}
  Collection.findOne(id,callback);
}


module.exports.addCollection=function(newCollection,callback){
  newCollection.save(callback);
}
