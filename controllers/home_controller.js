const Post=require('../models/posts');
const User=require('../models/user');

module.exports.home = async function (req, res) {
    // Post.find({},function(err,posts){
    //     if(err)
    //     {
    //         console.log("Error while getting posts from db");
    //         return;
    //     }
    //     else
    //     {
    //         return res.render('home',{
    //             title:"home",
    //             Posts_Data:posts
    //         });
    //     }
    // })

    //to populate the user data we just need to use mongoose populate

    //console.log(locals.user);
    // Post.find({}).populate('user').exec(function(err,posts){

    //     if(err)
    //     {
    //         console.log("Error while getting posts from db");
    //         return;
    //     }
    //     else
    //     {
    //         return res.render('home',{
    //             title:"home",
    //             Posts_list:posts
    //         });
    //     }

    // })

    // console.log("IN side home",req.user.id);
    // Post.find({}).populate('user').populate({path:'comments',populate:{path:'user'}}).exec(function(err,posts){

    //     if(err)
    //     {
    //         console.log("Error while getting posts from db");
    //         return;
    //     }   
    //     else
    //     {
    //         User.find({},function(err,users){
    //             return res.render('home',{
    //                 title:"home",
    //                 Posts_list:posts,
    //                 allusers_list:users
    //             });
    //         })

    //     }
    // });

    //To handle error user try catch

    try {
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

        let users = await User.find({});

        return res.render('home', {
            title: "home",
            Posts_list: posts,
            allusers_list: users
        });

    } catch (err) {

        console.log("ERROR",err);

    }

}





