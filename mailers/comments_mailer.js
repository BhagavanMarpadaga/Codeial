const nodeMailer=require('../config/nodemailer');

exports.newComment=(comment)=>{

    nodeMailer.transporter.sendMail({
        from:'CodeialDev.in',
        to:comment.user.email,
        subject:'New comments addded',
        html:'<h1>Your comment added successfully</h1>'
    },(err,info)=>{
        if(err)
        {
            console.log('Error in sending mail while adding new comment',err);
            return;
        }
        console.log('MESSAGE sent',info);
        return;
    })
}