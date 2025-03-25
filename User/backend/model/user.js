const mongoose=require('mongoose');

//schema

const regSchema=new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},

});

module.exports=mongoose.model('User', regSchema, 'regDetails');