const Post=require('../models/posts');
const Comment=require('../models/comments');

module.exports.post=function(req,res)
{
    
    Post.create({   
        content:req.body.content,
        user:req.user._id,

    },function(err,post)
    {
        if(err)
        {
            console.log("Error while storing post in db");
            return;
        }
        else
        {
            res.locals.post=post;
            return res.redirect('back');
        }
    })
}



