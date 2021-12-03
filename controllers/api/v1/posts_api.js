const Post=require('../../../models/posts');
const Comment=require('../../../models/comments');

//get posts and show it in post man
module.exports.post = async function (req, res) {

    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate(
            {
                path: 'comments',
                populate:
                {
                    path: 'user'
                }
            });
    return res.status(200).json({
        message: "list of posts",
        post:posts
    })
}

module.exports.destroy = async function (req, res) {
    try {
        console.log("It is called");
        //check whether the post existed in db or not
        let post = await Post.findById(req.params.id);

        //id means converting object into string
        //Some one else can't authorize to delete my post
        if (post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({ post: req.params.id });
            // if(req.xhr)
            // {
            return res.status(200).json({
                // data:{post_id:req.params.id},
                message: "post and associated comments are deleted"
                // })
                //}
            })
        }
        else {
            return res.status(401).json({
                message: "you are not authrorized to delete this post"
            })
        }
    }
    catch (err) {
        return res(500).json({
            message: "Internal Server Error"
        })
    }

}