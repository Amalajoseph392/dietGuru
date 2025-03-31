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

//recepies-create

router.post('/recepies-create',upload.single('rec_image'), recepies.recepieCreate)

module.exports=router;

