const express= require('express');

const router=express.Router();

//get that home controller by calling require

const homeController=require('../controllers/home_controller');

console.log("MY router got loaded");

//give homecontroller to browser

router.get('/',homeController.home);
router.get('/userprofile',homeController.profile);

router.use('/user',require('./users'));

module.exports=router;