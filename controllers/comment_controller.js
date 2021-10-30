const comment=require('../models/comments');
const post=require('../models/posts');

module.exports.comment=function(req,res)
{
    //check post id exist or not 
    post.findById(req.body.postId,function(err,post){
        if(err)
        {
            console.log("Post id not found in db user is smart enough to change it");
            return;
        }
        else
        {
            comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.postId
            },function(err,comment){
                if(err)
                {
                    console.log('Error while adding comment in DB');
                    return;
                }
                else
                {
                    //upadte the value of comment id in the post collection [in comments array]
                    post.comments.push(comment);
                    post.save();
                    return res.redirect('back');
                }
        
            })
            
        }
    })

    
}