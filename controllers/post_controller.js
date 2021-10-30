const Post=require('../models/posts');

module.exports.post=function(req,res)
{
    Post.create({   
        content:req.body.content,
        user:req.user._id
    },function(err,post)
    {
        if(err)
        {
            console.log("Error while storing post in db");
            return;
        }
        else
        {
            return res.redirect('back');
        }
    })
}

