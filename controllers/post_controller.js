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

//destroy a post
module.exports.destroy=function(req,res)
{
    //check whether the post existed in db or not
    Post.findById(req.params.id,function(err,post){

        if(err)
        {
            console.log("ERROR while searching post in DB");
            return;
        }
        else
        {
            //id means converting object into string
            //Some one else can't authorize to delete my post
            if(post.user == req.user.id)
            {
                post.remove();
                Comment.deleteMany({post:req.params.id},function(err){
                    return res.redirect('back');
                })
            }
            else
            {
                return res.redirect('back');
            }
        }

    })
}




