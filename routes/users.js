const { application } = require('express');
const express=require('express');
const passport=require('passport');
const router=express.Router();


//call the user_controller

const userController=require('../controllers/user_controller');

//profile accessable only when the user is signed in
router.get('/profile',passport.checkAuthentication,userController.profile);

router.get('/sign-in',userController.signin);
router.get('/sign-up',userController.signup);

router.post('/create',userController.create);


router.post('/create-session',
            passport.authenticate('local',{failureRedirect:'/user/sign-in'},),
            userController.createSession
);

router.get('/sign-out',userController.destrotySession);



module.exports=router;