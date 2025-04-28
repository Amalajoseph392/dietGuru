const User=require('../model/user');
const jwt=require('jsonwebtoken');

//register

const register=async (req,res)=>{
    try{
        const {name,email,password, role,AddedOn}=req.body;
        const existUser=await User.findOne({email});
        if(existUser){
            return res.status(400).json({message:'email already exists!'});
           
        }

        const user=new User({name,email,password, role,AddedOn});
        await user.save();

        res.status(201).json({message:'User regsitered successfully'});
    }catch(err){
        res.status(500).json({message:'Something went wrong', err});
    }


}

const login=async(req,res)=>{
    try{

        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:'Invalid email or password'});

        }
        if(user.password!==password){
            return res.status(400).json({message:'Invalid password!'})
        }
     
       
        

        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.status(200).json({message:'Login Successful',token, role:user.role, name:user.name, email:user.email});

    }
    catch(err){
        res.status(500).json({message:'Something went wrong!'});


    }

    
}


//  .................. fetching all users from the table ....................................

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }); // Exclude passwords for security
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch users', error: err.message });
    }
};





const totalUsers = async (req, res) => {
    try {
        // Count the total number of users
        const totalCount = await User.countDocuments({ role: { $ne: 'admin' } });


         // Count the total number of dietitians (role: 'dietian')
         const dietitianCount = await User.countDocuments({ role: "dietian" });


        res.status(200).json({
            totalCount,
            dietitianCount,
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch users', error: err.message });
    }
};




//delete user

const deleteUser = async (req, res) => {
    try {
        const { email } = req.params;

        const deletedUser = await User.findOneAndDelete({ email });

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete user', error: err.message });
    }
};


//edit user

const editUser = async (req, res) => {
    try {
        const { email } = req.params;
        const updates = req.body; 

        const updatedUser = await User.findOneAndUpdate(
            { email },
            updates,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update user', error: err.message });
    }
};





module.exports={
    register,
    login,
    getAllUsers,
    deleteUser,
    totalUsers,
    editUser
}