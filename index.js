const express=require('express');

const app=express();
const port=8000;
//use your cookie

const cookieParser=require('cookie-parser');
//middleware
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



const db=require('./config/mongoose');
//import layout library using npm install express-ejs-layouts and add that one here
const expresslayouts=require('express-ejs-layouts');

app.use(expresslayouts);

//extract styles and scripts from subpages to layouts other wise style tag added inside body
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//use static files
app.use(express.static('./Assets'));
// express router
app.use('/',require('./routes'));
// set up our views
app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running the server:${err}`);
        return;
    }

    console.log(`Server up with the port:${port}`);

})