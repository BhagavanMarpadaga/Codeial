const express= require('express');
const router=express.Router();
const passport=require('passport');
const posts=require('../../../controllers/api/v1/posts_api');

router.get('/',posts.post);

//Authentication check
router.delete('/deletepost/:id',passport.authenticate('jwt',{session:false}),posts.destroy);

module.exports=router;