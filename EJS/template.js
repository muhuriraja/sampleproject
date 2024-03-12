let ejs = require ('ejs');
let fs = require('fs');
let filePath = __dirname + '/../emailTemplate/forgetPassword.ejs';
let templateString = fs.readFileSync(filePath, 'utf-8');
let createForgetPasswordEmail = ((token)=>{
   return ejs.render(templateString,{token: token});
});

module.exports ={
    createForgetPasswordEmail,
}

