const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());


const transporter = nodemailer.createTransport({
    service: 'gmail', // 
    auth: {
        user: 'example@gmail.com', 
        pass: 'password'  
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.error('Error with SMTP configuration:', error);
    } else {
        console.log('SMTP configuration is correct');
    }
});

app.post('/send-email', async (req, res) => {
    const { subject, text, recipients } = req.body;

    try {
        for (const recipient of recipients) {
            const mailOptions = {
                from: 'example@gmail.com', 
                to: recipient,                
                subject: subject,             
                text: text                    
            };

            
            await transporter.sendMail(mailOptions);
        }
        res.status(200).send('Emails sent successfully');
    } catch (error) {
        console.error('Error sending email:', error); // 更详细的错误日志
        res.status(500).send('Error sending email: ' + error.toString());
    }
});

const PORT = process.env.PORT || 8088; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
