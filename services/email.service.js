import pkg from '@sendgrid/mail';
const { setApiKey, send } = pkg;

setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (userEmail, userName) => {
    const msg = {
        to: userEmail,
        from: 'hemantwanted007@gmail.com', // 
        subject: 'Welcome to Our Platform!',
        text: `Hi ${userName}, welcome to our platform!`,
        html: `<strong>Hi ${userName}, welcome to our platform!</strong>`,
    };

    send(msg)
        .then(() => {
            console.log('Welcome email sent successfully');
        })
        .catch((error) => {
            console.error('Error sending email:', error);
        });
};

export { sendWelcomeEmail };
