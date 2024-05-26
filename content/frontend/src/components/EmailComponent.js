import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Card } from '@douyinfe/semi-ui';
import NavApp from "../Header";

const EmailComponent = () => {
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [recipients, setRecipients] = useState([]);
    const [emails, setEmails] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchEmails();
    }, []);

    const fetchEmails = () => {
        axios.get('http://localhost:8000/api/employees/')
            .then(response => {
                setEmails(response.data);
                setRecipients(response.data.map(email => email.email)); 
            })
            .catch(error => {
                console.error('Error fetching emails:', error);
            });
    };

    const sendEmail = () => {
        axios.post('http://localhost:8088/send-email', {
            subject: subject,
            text: text,
            recipients: recipients
        })
        .then(response => {
            setMessage('Email sent successfully!');
            console.log('Email sent:', response.data);
        })
        .catch(error => {
            setMessage('Error sending email');
            console.error('Error sending email:', error);
        });
    };

    const handleSubjectChange = (e) => {
        console.log(e);  // Added for debugging
        console.log(e.target);  // Added for debugging
        setSubject(e.target.value);
    };

    const handleTextChange = (e) => {
        console.log(e);  // Added for debugging
        console.log(e.target);  // Added for debugging
        setText(e.target.value);
    };

    const columns = [
        {
            title: 'Recipient Email',
            dataIndex: 'email',
            render: (text) => (
                <span>{text}</span>
            ),
        },
    ];

    const dataSource = emails.map((email, index) => ({
        key: index,
        email: email.email,
    }));

    return (
        <div>
            <NavApp />
            <div className='mt-5 ms-5'>
                <Card
                    style={{ width: '800px', marginBottom: '20px' }}
                    hoverable
                    title='Send Email'
                >
                    <input
                        type="text"
                        placeholder="Subject"
                        value={subject}
                        onChange={handleSubjectChange}
                        style={{ marginBottom: '10px', width: '100%' }}
                    />
                    <textarea
                        placeholder="Email text"
                        value={text}
                        onChange={handleTextChange}
                        style={{ marginBottom: '10px', width: '100%', height: '100px' }}
                    />
                    <Button onClick={sendEmail}>Send Email</Button>
                    {message && <p>{message}</p>}
                </Card>
            </div>
            <Table title='Recipient Emails' columns={columns} dataSource={dataSource} />
        </div>
    );
};

export default EmailComponent;

