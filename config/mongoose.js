const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/codial_devlopment');
const db=mongoose.connection;

db.on('error',console.error.bind(console,'error while connecting to database'));

db.once('open',function(){
    console.log("successfully connected to database");
});

module.exports=db;
