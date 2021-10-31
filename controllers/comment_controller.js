const comment=require('../models/comments');
const post=require('../models/posts');

//adding a comment
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

//destroying comment
module.exports.destroy=function(req,res)
{
    //find the comment is there in db or not
    comment.findById(req.params.id,function(err,commentitem){
        if(commentitem)
        {
            //check user authorized to delete
            //you can delete your own comment
            //you can delete the comments on your post
            const postid=commentitem.post;
            //find the user who posted this comment bcz he is authrized to delete
            post.findById(postid,function(err,commentdOnPost){
                if((commentitem.user==req.user.id)||(commentdOnPost.user==req.user.id))
                {
                 
                    commentitem.remove();
                    post.findByIdAndUpdate(postid,{$pull:{comments:req.params.id}},function(err,post){
                        return res.redirect('back');
                    })
                }
                else
                {
                    return res.redirect('back');
                }

            })


        }
        else
        {
            return res.redirect('back');
        }
    })
}