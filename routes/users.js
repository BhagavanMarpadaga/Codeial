const { application } = require('express');
const express=require('express');

const router=express.Router();

//call the user_controller

const userController=require('../controllers/user_controller');

router.get('/profile',userController.profile);

router.get('/sign-in',userController.signin);
router.get('/sign-up',userController.signup);

router.post('/create',userController.create);


module.exports=router;