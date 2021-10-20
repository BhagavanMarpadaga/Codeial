const express=require('express');

const app=express();
const port=8000;

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