const Recepies=require('../model/recepies');



const recepieCreate=async (req,res)=>{
    try{
        const {rec_name,rec_exp,rec_image}=req.body;
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