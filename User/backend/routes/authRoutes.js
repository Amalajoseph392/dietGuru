const express=require('express');
const authController=require('../controller/authController');
const recepies = require('../controller/recepies');
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

// ............... update receipes by id ..................
router.put('/recipes/:id', upload.single('rec_image'), recepies.recepieUpdate);

// ......................... delete the recipe bi it's id ................................
router.delete('/recipes/:id', recepies.deleteRecipeById);


//recepies-create

router.post('/recepies-create',upload.single('rec_image'), recepies.recepieCreate)

module.exports=router;

