const ResetPassword=require('../models/resetPassword');
const User=require('../models/user');
const crypto=require('crypto');
const path=require('path');
const resetPwdmailer=require('../mailers/reset_password');



module.exports.forgotpwd=function(req,res){

   return  res.render('reset_pwd',{title:'Reset password'});

}
module.exports.sendresetLink = async function (req, res) {

    //console.log(req.body);
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        let newpassword = await ResetPassword.create({
            user: user._id,
            accesstoken: crypto.randomBytes(20).toString('hex'),
            isValid: false
        });
        let linktoSend = "http://localhost:8000/resetpwd/reset/"+newpassword.accesstoken;
        console.log(linktoSend);
 
        let dataTosent = {
            link: linktoSend,
            userName: user.name,
            userEmail: user.email
        };
        //this line sends the mail to user if user clicks on forgot password
       // resetPwdmailer.newPwd(dataTosent);
        res.send("<h1>A link to reset your password is sent to email</h1>");


    }
    else {
        return res.redirect('back');
    }
    //send a mail to user asking to create new password by giving one link

}
module.exports.allowToenterNewpwd= async function(req,res)
{

    let item =await ResetPassword.findOne({accesstoken:req.params.id});
    if(item.isValid!=true)
    {
        console.log("Access Token",req.params.id);
        return res.render('create_newpassword',
        {
            title: 'create new password',
            accesstoken:req.params.id
            
        })

    }
    else
    {
        res.send("<h1>Session expired :)</h1>");
    }


}
module.exports.savenewPwd=async function(req,res){


    if(req.body.password==req.body.confirmpassword)
    {
        let item=await ResetPassword.findOne({accesstoken:req.params.id});

        //populate user using the item update the passwords
        let user=await item.populate('user');
        console.log("user found with his id as ",user.user._id);
        User.findByIdAndUpdate(user.user._id,{password:req.body.password},function(err,user){
            if(err)
            {
                Console.log("Error while updating password in user in db",err);
                return;
            }
            else
            {
                console.log("User updated");
            }
        })


        //make sure accessToke no longer valid

        ResetPassword.findByIdAndUpdate(item._id,{isValid:true},function(err,item){
            if(err)
            {
                Console.log("Error while updating accessToken to true in db",err);
                return;
            }
            else{
              res.send("<h3>Password updated suceessfully click <a href="+'http://localhost:8000/user/sign-in'+"> here</a> to login</h3>");
            }

        })
    }

    
    // console.log("req.params",req.params);
    // console.log(req.body);
    // //res.render('create_newpassword',{title:'create new password'});
    //return res.send("All right!");

} 