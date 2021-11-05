const Post=require('../models/posts');
const Comment=require('../models/comments');

module.exports.post = async function (req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id,

        });
        req.flash('success','post published!');
        return res.redirect('back');

    } catch (err) {
        req.flash('error',err);
        return res.redirect('back');

    }

}

//destroy a post
module.exports.destroy = async function (req, res) {
    try {
        //check whether the post existed in db or not
        let post = await Post.findById(req.params.id);

        //id means converting object into string
        //Some one else can't authorize to delete my post
        if (post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({ post: req.params.id })
        }
        req.flash('success','post deleted!');
        return res.redirect('back');

    } 
    catch (err) {
        req.flash('error',err);
        return res.redirect('back');;
    }

}




