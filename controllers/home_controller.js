module.exports.home=function(req,res)
{
    console.log(req.cookies);
    res.cookie('user_id',25);
    return res.render('home',{
        title:"home"
    });

}

module.exports.profile=function(req,res){

    return res.render('user_profile',{});
}

//module.exports.actionName=functions(req,res){}