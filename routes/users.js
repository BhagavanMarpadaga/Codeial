const { application } = require('express');
const express=require('express');

const router=express.Router();

//call the user_controller

const userController=require('../controllers/user_controller');

router.get('/profile',userController.profile);
router.use('/profile',require('./post'));



module.exports=router;