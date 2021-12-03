const User=require('../models/user');

//helps to delete profile picture
const fs=require('fs');
const path=require('path');
module.exports.profile=function(req,res)
{
    User.findById(req.params.id,function(err,user)
    {
        return res.render('user_profile',{ title:"userProfile",
                                            user_profile:user
                        });

    })
}
//to update user profile
module.exports.updateProfile=async function(req,res)
{
    // if(req.user.id==req.params.id)
    // {
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,updatedUser){
    //         
            
    //         User.uploadAvatar(req,res,function(err){
    //             if(err)
    //             {
    //                 console.log("ERROR IN multer");
    //                 return;
    //             }
    //             console.log(req.file);

    //         })
    //         return res.redirect('back');

    //     })
    // }
    // else
    // {
    //     return res.status(401).send('unauthorized');
    // }

    //Using async await

    if(req.user.id==req.params.id)
    {
        //console.log("I came here to update the profile information");
        try
        {
            console.log(req.params.id);
            let foundUser= await User.findById(req.params.id);
            User.uploadAvatar(req,res,function(err){
                if(err)
                {
                    console.log('Error in multer');
                    return;
                }
                foundUser.name=req.body.name;
                foundUser.email=req.body.email;
                if(req.file)
                {
                    //while updating new profile pic delete the old prfile pic instead keeping that in disc
                    if(foundUser.avatar)
                    {
                        let filepressent=false;
                        const checkPath=path.join(__dirname,'..',foundUser.avatar);
                        //before deleting check whether the file in present in strage or not
                        fs.access(checkPath,function(err){
                            if(err)
                            {
                                console.log("File not present");
                                filepressent=false;
                            }
                            else
                            {
                                console.log("File present");
                                filepressent=true;
                            }
                        })
                       if(filepressent)
                       fs.unlinkSync(path.join(__dirname,'..',foundUser.avatar));
                    }
                    //path where uploaded file is getting saved
                    foundUser.avatar=User.avatartPath+'/'+req.file.filename;

                }
                foundUser.save();

                return res.redirect('back');
            })

        }
        catch(err)
        {
            req.flash('error',err);
            console.log('Error',err);
            return res.redirect('back');

        }

    }
    else
    {
        return res.status(401).send('unauthorized');
    }
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

    req.flash('success','logged in successfully');
    return res.redirect('/');

}
module.exports.destrotySession=function(req,res)
{
    req.logout();
    req.flash('success','You have logged out!');
    return res.redirect('/');
}