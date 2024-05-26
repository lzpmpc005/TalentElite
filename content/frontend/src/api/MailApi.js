import axios from 'axios';

const MAIL_API_BASE_URL = 'http://localhost:8081/send-email';

const MailApi = {
    sendEmail: (subject, text, recipients) => {
        return axios.post(MAIL_API_BASE_URL, { subject, text, recipients }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};

export default MailApi;
