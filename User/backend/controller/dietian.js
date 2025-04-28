const User=require('../model/dietian');


const user_assign = async (req, res) => {
    try {
      const { dietian_name, email, assigned_users } = req.body;
  
      const updatedOrNewUser = await User.findOneAndUpdate(
        { email },
        { dietian_name, email, assigned_users },
        { new: true, upsert: true } 
      );
  
      res.status(200).json({ message: 'Users assigned successfully', user: updatedOrNewUser });
    } catch (err) {
      res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
  };

// const user_assign = async (req, res) => {
//   try {
//     const { dietian_name, email, assigned_users } = req.body;

//     // Fetch users that are unassigned to any dietitian
//     const unassignedUsers = await User.find(
//       { dietian_name: { $exists: false } }, // Find users with no dietitian assigned
//       { password: 0 } // Exclude password for security
//     );

//     if (!unassignedUsers || unassignedUsers.length === 0) {
//       return res.status(400).json({ message: 'No unassigned users available' });
//     }

//     // Find or create a dietitian entry and update the assigned users
//     const updatedOrNewDietitian = await User.findOneAndUpdate(
//       { email },
//       { dietian_name, email, assigned_users },
//       { new: true, upsert: true } // Create a new document if not found
//     );

//     res.status(200).json({
//       message: 'Users assigned successfully',
//       dietitian: updatedOrNewDietitian,
//       unassignedUsers, // Return the list of unassigned users
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Something went wrong', error: err.message });
//   }
// };

  // const getUserByEmail = async (req, res) => {
  //   try {
  //     const { email } = req.params;
  
  //     const user = await User.findOne({ email }, { password: 0 }); 
  
  //     if (!user) {
  //       return res.status(404).json({ message: 'User not found' });
  //     }
  
  //     res.status(200).json(user);
  //   } catch (err) {
  //     res.status(500).json({ message: 'Failed to fetch user', error: err.message });
  //   }
  // };


  const getUserByEmail = async (req, res) => {
    try {
      const { email } = req.params;
  
      // Find the user by email and ensure they haven't been assigned a dietitian
      const user = await User.findOne(
        { email, dietian_name: { $exists: false } }, 
        { password: 0 } 
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found or already assigned to a dietitian' });
      }
  
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch user', error: err.message });
    }
  };
  

  
  const getAssignedDietitian = async (req, res) => {
    const { email } = req.params;
    console.log('Looking for dietitian assigned to:', email);
  
    try {
      const dietitian = await User.findOne({
        assigned_users: { $elemMatch: { $regex: new RegExp(`^${email}$`, 'i') } }
      });
  
      if (dietitian) {
        res.status(200).json(dietitian);
      } else {
        res.status(404).json({ message: 'No dietitian assigned' });
      }
    } catch (err) {
      console.error('Error finding dietitian:', err);
      res.status(500).json({ message: 'Server error', err });
    }
  };
  
  const getUsersByDietitianEmail = async (req, res) => {
    try {
      const { email } = req.params;
  
      const dietitian = await User.findOne({ email });
  
      if (!dietitian) {
        return res.status(404).json({ message: 'Dietitian not found' });
      }
  
      const assignedUsers = dietitian.assigned_users || [];
  
      res.status(200).json({ assigned_users: assignedUsers });
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch assigned users', error: err.message });
    }
  };
  



  
  
  


module.exports={
    user_assign,
    getUserByEmail,
    getAssignedDietitian,
    getUsersByDietitianEmail
}