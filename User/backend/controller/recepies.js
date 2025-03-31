const Recepies=require('../model/recepies');
const path = require('path');




const recepieCreate=async (req,res)=>{
    console.log("in function")


    try{
        const {rec_name,rec_exp}=req.body;
        const rec_image = req.file ? `/uploads/${req.file.filename}` : null;
        const recepie=new Recepies({rec_name,rec_exp,rec_image});
        await recepie.save();

        res.status(201).json({message:'recepie added successfully'});
    }catch(err){
        res.status(500).json({message:'Something went wrong', err});
    }


}



module.exports={
    recepieCreate
}