const Post=require('../models/posts');

module.exports.home=function(req,res)
{
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

    Post.find({}).populate('user').populate({path:'comments',populate:{path:'user'}}).exec(function(err,posts){

        
        if(err)
        {
            console.log("Error while getting posts from db");
            return;
        }
        else
        {
            return res.render('home',{
                title:"home",
                Posts_list:posts
            });
        }
    });
}





