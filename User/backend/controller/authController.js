const User=require('../model/user');
const jwt=require('jsonwebtoken');

//register

const register=async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        console.log("yes here am");
        const existUser=await User.findOne({email});
        console.log("yes here am 2");
        if(existUser){
            return res.status(400).json({message:'email already exists!'});
           
        }

        const user=new User({name,email,password});
        console.log("yes here am 3", user);
        await user.save();
        console.log("yes here am save");

        res.status(201).json({message:'User regsitered successfully'});
    }catch(err){
        res.status(500).json({message:'Something went wrong', err});
    }


}

const login=async(req,res)=>{
    try{

        const {email,password}=req.body;
        const user=await User.findOne({email});
        console.log("user",user);
        if(!user){
            return res.status(400).json({message:'Invalid email or password'});

        }
        if(user.password!==password){
            return res.status(400).json({message:'Invalid password!'})
        }

        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.status(200).json({message:'Login Successful',token});

    }
    catch(err){
        res.status(500).json({message:'Something went wrong!'});


    }

    
}

module.exports={
    register,
    login
}