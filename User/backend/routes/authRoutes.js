const express=require('express');
const authController=require('../controller/authController');
const recepies = require('../controller/recepies');
const diteian = require('../controller/dietian');
const mealPlan=require('../controller/status')

const user_input=require('../controller/meals');

const router=express.Router();
const multer = require('multer');
const path = require('path');




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage });

//reg api

router.post('/register',authController.register)

//login

router.post('/login',authController.login)

// ............... fetching all users ..................
router.get('/users',authController.getAllUsers);



// ............... fetching all recepies ..................
router.get("/recipes", recepies.getAllRecepies);

router.get('/totalCount',authController.totalUsers);


// ............... update receipes by id ..................
router.put('/recipes/:id', upload.single('rec_image'), recepies.recepieUpdate);

// ......................... delete the recipe bi it's id ................................
router.delete('/recipes/:id', recepies.deleteRecipeById);


//recepies-create

router.post('/recepies-create',upload.single('rec_image'), recepies.recepieCreate);

//assign_users

router.post('/dietian_users', diteian.user_assign);
//delete user

router.delete('/delete_users/:email', authController.deleteUser);

//edit users

router.put('/edit_user/:email', authController.editUser);


router.post('/submit-input', user_input.user_data_meal);



router.get('/get_assign_user/:email', diteian.getUserByEmail);
router.get('/assigned-dietitian/:email', diteian.getAssignedDietitian);
router.get('/meal-plan/:email', mealPlan.getMealPlanByEmail);
router.put('/meal-plan/:email/actual/:day',mealPlan.addActualPlan);
router.get('/assigned-users/:email', diteian.getUsersByDietitianEmail);
router.put('/edit_plan/:email',mealPlan.editMeal);

router.get('/getTotalMealPlansCount',mealPlan.getTotalMealPlansCount);


module.exports=router;

