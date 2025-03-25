const mongoose=require('mongoose');

const recepieSchema=new mongoose.Schema({
    rec_name:{type:String, required:true, unique:true},
    rec_exp:{type:String,required:true},
    rec_image:{type:String,required:true}


})

module.exports=mongoose.model('Recepies', recepieSchema, "recepies-create");