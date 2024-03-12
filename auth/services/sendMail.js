let express = require("express");
const nodemailer = require("nodemailer");



let sendMail = async(email,html) => {

    try{
        let transport = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user:  process.env.EMAIL, // generated ethereal user
              pass:  process.env.PASSWORD,
            }
        });
    
        const mailOptions = {
            from: '"Nilmadhav Muhuri" <nilmadhab1997muhuri@gmail.com>',
            to: email, // email need to implement
            subject: "Email verification",
            html,
        };
    
        let mailsend = await transport.sendMail(mailOptions);
        return mailsend;
    } catch(error){
        throw new Error(error)
    }

    

}


module.exports ={
    sendMail
}