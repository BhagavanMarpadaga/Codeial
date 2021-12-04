const { application } = require('express');
const express=require('express');
const passport=require('passport');
const router=express.Router();


//call the user_controller

const userController=require('../controllers/user_controller');

//profile accessable only when the user is signed in
router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',userController.updateProfile);

router.get('/sign-in',userController.signin);
router.get('/sign-up',userController.signup);

router.post('/create',userController.create);


router.post('/create-session',
            passport.authenticate('local',{failureRedirect:'/user/sign-in'},),
            userController.createSession
);
//when click in sign in with goolge redirects to google page and data fetch from there
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
//when google fetches the data it sends it back to me
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/user/sign-in'},userController.createSession));
router.get('/sign-out',userController.destrotySession);



module.exports=router;