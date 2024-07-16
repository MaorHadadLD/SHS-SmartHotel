import nodemailer from 'nodemailer';

export const sendEmail = async (recipientEmail, otp) => {
    // Configure the transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: 'shs.smarthotel@gmail.com',
            pass: 'cogr wqtj uipe ipwg', 
        }
    });

    // Email options
    let mailOptions = {
        from: 'shs.smarthotel@gmail.com', 
        to: recipientEmail,
        subject: 'SHS Reset Password OTP',
        html: `Your new OTP code is <strong>${otp}</strong></p>`
    };

    // Send the email
    await transporter.sendMail(mailOptions);
}