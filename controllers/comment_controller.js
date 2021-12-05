const comment=require('../models/comments');
const post=require('../models/posts');
const commentMailer=require('../mailers/comments_mailer');
const queue=require('../config/kue');
const commentMailWorker=require('../workers/comment-email-workers');
//adding a comment
module.exports.comment = async function (req, res) {
    try {

        //check post id exist or not 
        console.log(req.body);
        let postItem = await post.findById(req.body.postId);
        if (postItem) {
            let newcomment = await comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.postId
            });
            //upadte the value of comment id in the post collection [in comments array]
            postItem.comments.push(newcomment);
            postItem.save();
            newcomment=await newcomment.populate('user','name email');
          //  console.log(newcomment);
           // commentMailer.newComment(newcomment);
           let job=queue.create('emails',newcomment).save(function(err){
               if(err)
               {
                   console.log("Error while queuing the job",err);
                   return;
               }
               console.log("job addeding to queue with id:",job.id);
           })


            if(req.xhr)
            {
                return res.status(200).json({
                    data:{
                        comment:newcomment
                    },
                    message:'comment created'
                })
            }
           
        }

        return res.redirect('back');

    } catch (err) {
        console.log('Error',err);
        req.flash('error',err);
        return res.redirect('back');
    }
}
//adding a comment through ajax request :it's na r&d ignore
module.exports.addComment = async function (req, res) {
    try {

        //check post id exist or not 
        let postItem = await post.findById(req.params.Id);

        if (postItem) {
            let newcomment = await comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.params.Id
            });
            //upadte the value of comment id in the post collection [in comments array]
            postItem.comments.push(newcomment);
            postItem.save();

            if(req.xhr)
            {
                return res.status(200).json({
                    data:{
                        comment:newcomment
                    },
                    message:'comment created'
                })
            }
           
        }

        return res.redirect('back');

    } catch (err) {
        console.log('Error',err);
        req.flash('error',err);
        return res.redirect('back');
    }
}


//destroying comment
module.exports.destroy = async function (req, res) {
    try {
        //find the comment is there in db or not
        console.log(req.params.id);
        let commentitem = await comment.findById(req.params.id);
        if (commentitem) {
            //check user authorized to delete
            //you can delete your own comment
            //you can delete the comments on your post
            const postid = commentitem.post;
            //find the user who posted this comment bcz he is authrized to delete
            let commentdOnPost = await post.findById(postid);

            if ((commentitem.user == req.user.id) || (commentdOnPost.user == req.user.id)) {

                commentitem.remove();
                let findpost =await post.findByIdAndUpdate(postid, { $pull: { comments: req.params.id } });
              
            }

            if(req.xhr)
            {
                return res.status(200).json({
                    data:{
                        comment_id:req.params.id
                    }
                })
            }
        }
        return res.redirect('back');

    } catch (err) {
        req.flash('error',err);
        return;
    }

}