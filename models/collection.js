const mongoose=require('mongoose');
const config=require('../config/database');


//Collection SCHEMA
const CollectionSchema=mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  date:{
    type:String,
    required:true //an email is required
  },
  images:{
    type:String,
    required:true
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
