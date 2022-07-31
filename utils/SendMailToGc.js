const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const SendMailToGc = async (email, password) => {

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Your Login Credentials As Garbage Collector",
        text: `Email : ${email}\nPassword: ${password}`
    }
    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
    })
}

module.exports = {
    SendMailToGc,
}