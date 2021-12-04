const User=require('../../../models/user');
const jwt=require('jsonwebtoken');

module.exports.createSession= async function(req,res)
{

    try
    {
        let user=await User.findOne({email:req.body.email});
        if(!user||user.password!=req.body.password)
        {
            return res.json(422,{
                message:"Invalid username or password"
            });
        }
        return res.json(200,{
            message:"Sign in successfully, here is your token",
            data:{
                token:jwt.sign(user.toJSON(),'secret',{expiresIn:1000000})
            }
        })


    }
    catch (err) {

        return res(500).json({
            message: "Internal Server Error"
        })
    }


}
