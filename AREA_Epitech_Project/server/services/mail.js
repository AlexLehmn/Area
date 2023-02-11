const nodemailer = require('nodemailer');
const { botmail_user, botmail_password } = require('./config.json');
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: botmail_user,
        pass: botmail_password
    }
})

const sendMail = (receiver, subject, content) => {
    const options = {
        from: '"StonksArea" <ludwig.wolf2@ethereal.email>',
        to: receiver,
        subject: subject,
        text: content
    }
    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err);
            return;
        }
    })
}

module.exports = { sendMail }