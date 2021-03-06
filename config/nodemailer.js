const nodemailer=require("nodemailer");
const ejs=require('ejs');
const path=require('path');

//create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {  //with which you will send emails
        user: '***********', // generated ethereal user
        pass: '*************', // generated ethereal password
    },
});
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    // console.log("Render Template is callled and data here is",data);
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath), data, function (err, template) {
            if (err) {
                console.log("Error while returning template", err);
                return;
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}

