const nodeMailer=require('../config/nodemailer');

exports.newComment=(comment)=>{

    
    //declare your tmeplate here
    let htmlString=nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from:'CodeialDev.in',
        to:comment.user.email,
        subject:'New comments addded',
        html:htmlString
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