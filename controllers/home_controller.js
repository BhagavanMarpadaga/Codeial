module.exports.home=function(req,res)
{
    return res.render('home',{
        title:"home"
    });

}

module.exports.profile=function(req,res){

    return res.render('user_profile',{});
}

//module.exports.actionName=functions(req,res){}