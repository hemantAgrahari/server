import postmark from 'postmark';
;



const sendWelcomeEmail = async (email, name) => {
    try {

        const client = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN);

        const emailData = {
            From: process.env.FROM_EMAIL,
            To: email,
            Subject: "Welcome Mail",
            TextBody: `${name}, Thanks for sign up! Login to view your details.`,
        };

        const result = await client.sendEmail(emailData);
        console.log('Email sent successfully:', result);
        return result;
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Unable to send email');
    }
};

export default sendWelcomeEmail;
