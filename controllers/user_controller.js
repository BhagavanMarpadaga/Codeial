const User=require('../models/user');
module.exports.profile=function(req,res)
{
    return res.render('user_profile',{ title:"userProfile",
                                        user:req.user});
}
//renders the sign in page
module.exports.signin=function(req,res)
{
   
    if(req.isAuthenticated())
    {
        
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_in',{title:"Codeial|signin"});

}
console.log("Inside controller");
//renders sing up page
module.exports.signup=function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/user/profile');
    }

    return res.render('user_sign_up',{title:"Codeial|signup"});

}

//add sing in form to that page
module.exports.create=function(req,res)
{
    //check pwd and confirm pwd same or not
    if(req.body.password!=req.body.confirmpassword)
    {
        console.log("Pwd doest not matches");
        return res.redirect('back');
    }
   //check entered email exist in the db or not if not create that user and take him to sign in page
    User.findOne({email:req.body.email},function(err,user){
        if(err)
        {
            console.log("Error while singing up",err);
            return;
        }

        if(!user)
        {
            User.create(req.body,function(err,user){
                if(err)
                {
                    console.log("Error while singing up",err);
                    return ;

                }

                return res.redirect('/user/sign-in');
            })
        }
    })

};

module.exports.createSession=function(req,res)
{
    // console.log(req.body);
    return res.redirect('/');

}
module.exports.destrotySession=function(req,res)
{
    req.logout();
    return res.redirect('/');
}