const mongoose=require('mongoose');

//schema

const regSchema=new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    role:{type:String, required:true},
    AddedOn:{type:Date,default:Date.now()}

});

module.exports=mongoose.model('User', regSchema, 'regDetails');