const express=require('express');

const app=express();
const port=8000;
//use session
const session =require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport_local_stratagy');
const passportJWT=require('./config/passport_jwt_strategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');
const mongoStore=require('connect-mongo');
//use your cookie
const cookieParser=require('cookie-parser');
const db=require('./config/mongoose');
const sassmiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const custMware=require('./config/middleware');
//we hve to rite just before the server starts

app.use(sassmiddleware({
    src: './Assets/SCSS',
    dest: './Assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'


}))

//middleware
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



//import layout library using npm install express-ejs-layouts and add that one here
const expresslayouts=require('express-ejs-layouts');

app.use(expresslayouts);

//extract styles and scripts from subpages to layouts other wise style tag added inside body
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use static files
app.use(express.static('./Assets'));
//use uploads folder
app.use('/uploads',express.static(__dirname+'/uploads'));

// express router

// set up our views
app.set('view engine','ejs');
app.set('views','./views');
//middle ware to encrpt the id
app.use(session({
    name: "codeial",
    secret: 'gooddayeveryday',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    // store: new mongoStore({
    //     mongooseConnection:db,
    //     autoremove:'disabled'
    // },function(err)
    // {
    //     console.log(err);
    // }
    // ) 
    store: mongoStore.create({
        mongoUrl: 'mongodb://localhost/codial_devlopment',
        autoRemove: 'disabled'
    }, function (err) {
        console.log(err);
    })

}))
//tell passport to use session
app.use(passport.initialize());
app.use(passport.session());

//setup current user usage
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(custMware.setFlash);
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running the server:${err}`);
        return;
    }

    console.log(`Server up with the port:${port}`);

})