import axios from 'axios';

const EMAIL_API_BASE_URL = 'http://localhost:8000/api/emails/';

const EmailApi = {
    getAllEmails: () => {
        return axios.get(EMAIL_API_BASE_URL);
    }
};

export default EmailApi;
