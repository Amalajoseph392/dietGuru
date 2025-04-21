const mongoose=require('mongoose');

//schema

const dietianSchema = new mongoose.Schema({
    dietian_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    assigned_users: { type: [String], required: true }, 
    AddedOn:{type:Date,default:Date.now()}
});

module.exports=mongoose.model('dietUser', dietianSchema, 'dietian_users');