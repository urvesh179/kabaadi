const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const sendemail = async (email) => {
    const randomnum = Math.floor((Math.random() * 1000000) + 1);

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "password recovery",
        text: `OTP : ${randomnum}`
    }
    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
    })

    return randomnum
}

module.exports = {
    sendemail,
}