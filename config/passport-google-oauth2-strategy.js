const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const User=require('../models/user');
const crypto=require('crypto');

//tell passport to user google oauth2
passport.use(new googleStrategy({
    clientID: "389354943603-bqf16q76sr178fudpmi39l4fdu5j1gho.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/user/auth/google/callback"

}, function (accessToken, refreshToken, profile, done) {

    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err)
        {
            console.log("Error in passport google strategy",err);
            return;
        }
        console.log(profile);
        if(user)
        {  //if user found return the user
            return done(null,user);
        }
        else
        {
            //else create the user
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },function (err,user){
                if(err)
                {
                    console.log("Error in passport google strategy",err);
                    return;
                }

                return done(null,user);
            })
        }
    })

}))