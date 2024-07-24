import nodemailer from 'nodemailer';
// / Configure the transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: 'shs.smarthotel@gmail.com',
            pass: 'cogr wqtj uipe ipwg', 
        }
    });
    export const sendEmail = async (recipientEmail, otp) => {

        // Email options
        let mailOptions = {
            from: 'shs.smarthotel@gmail.com',
            to: recipientEmail,
            subject: 'SHS Smart Hotel - Password Reset OTP',
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #4CAF50; text-align: center;">SHS Smart Hotel</h2>
                <p>Dear Guest,</p>
                <p>We received a request to reset the password for your account. Please use the following One-Time Password (OTP) to complete the process:</p>
                <p style="font-size: 24px; font-weight: bold; color: #FF5722; text-align: center;">${otp}</p>
                <p>This OTP is valid for the next 10 minutes. If you did not request a password reset, please ignore this email or contact our support team immediately.</p>
                <p>Thank you,</p>
                <p style="font-weight: bold;">The SHS Smart Hotel Team</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;"/>
                <p style="font-size: 12px; color: #999; text-align: center;">
                    This is an automated message. Please do not reply to this email.</a>.
                </p>
            </div>`
        };
    
        // Send the email
        await transporter.sendMail(mailOptions);
    }
    
export const sendEmailRoom = async (recipientEmail, roomNumber) => {
   
    // Email options
    let mailOptions = {
        from: 'shs.smarthotel@gmail.com', 
        to: recipientEmail,
        subject: 'Welcome to SHS Smart Hotel - Your Room Awaits!',
        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #4CAF50; text-align: center;">Welcome to SHS Smart Hotel!</h2>
            <p>Dear Valued Guest,</p>
            <p>We are thrilled to have you with us and look forward to making your stay a memorable one. We're pleased to inform you that your room is ready. Here are your details:</p>
            <p style="font-size: 24px; font-weight: bold; color: #FF5722; text-align: center;">Room Number: ${roomNumber}</p>
            <p>During your stay, we invite you to take advantage of our top-notch amenities and exceptional services. If there is anything you need, please do not hesitate to contact us in our app chat or through the reception desk.</p>
            <p>Wishing you a comfortable and enjoyable stay.</p>
            <p>Warm regards,</p>
            <p style="font-weight: bold;">The SHS Smart Hotel Team</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;"/>
            <p style="font-size: 12px; color: #999; text-align: center;">
                This is an automated message. Please do not reply to this email.</a>.
            </p>
        </div>`
    };

    // Send the email
    await transporter.sendMail(mailOptions);
}
