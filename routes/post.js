const express=require('express');

const router=express.Router();

//call your post controller

const postController=require('../controllers/post_controller');

router.get('/post',postController.post);

module.exports=router;
