const express=require('express');
const authController=require('../controller/authController');
const recepies = require('../controller/recepies');
const router=express.Router();

//reg api

router.post('/register',authController.register)

//login

router.post('/login',authController.login)

//recepies-create

router.post('/recepies-create', recepies.recepieCreate)

module.exports=router;

