const express= require('express');
const router=express.Router();

//get that home controller by calling require

const homeController=require('../controllers/home_controller');

console.log("MY router got loaded");

//give homecontroller to browser

router.get('/',homeController.home);


router.use('/user',require('./users'));
router.use('/post',require('./post'));

module.exports=router;