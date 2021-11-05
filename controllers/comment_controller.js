const comment=require('../models/comments');
const post=require('../models/posts');

//adding a comment
module.exports.comment = async function (req, res) {
    try {

        //check post id exist or not 
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
        }
        return res.redirect('back');

    } catch (err) {
        console.log('Error', err);
        return;
    }
}

//destroying comment
module.exports.destroy = async function (req, res) {
    try {
        //find the comment is there in db or not
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
        }
        return res.redirect('back');

    } catch (err) {
        console.log("ERROR", err);
        return;
    }

}