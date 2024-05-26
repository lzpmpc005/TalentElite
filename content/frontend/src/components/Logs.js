import React, { useEffect } from 'react';
import axios from 'axios';
import logApi from '../api/LogApi';

const SomeComponent = () => {
    useEffect(() => {
        // Fetch employees and log the API operation
        axios.get('http://localhost:8000/api/employees/')
            .then(response => {
                logApiOperation('GET', 'http://localhost:8000/api/employees/', response.status);
            })
            .catch(error => {
                if (error.response) {
                    logApiOperation('GET', 'http://localhost:8000/api/employees/', error.response.status);
                } else {
                    logApiOperation('GET', 'http://localhost:8000/api/employees/', 500);
                }
            });

        // Fetch departments and log the API operation
        axios.get('http://localhost:8000/api/departments/')
            .then(response => {
                logApiOperation('GET', 'http://localhost:8000/api/departments/', response.status);
            })
            .catch(error => {
                if (error.response) {
                    logApiOperation('GET', 'http://localhost:8000/api/departments/', error.response.status);
                } else {
                    logApiOperation('GET', 'http://localhost:8000/api/departments/', 500);
                }
            });
    }, []);

    const logApiOperation = (method, endpoint, status) => {
        const logEntry = {
            method: method,
            endpoint: endpoint,
            status: status
        };

        axios.post('http://localhost:8081/log', logEntry)
            .then(response => {
                console.log('Log entry created:', response.data);
            })
            .catch(error => {
                console.error('Error creating log entry:', error);
            });
    };

    return (
        <div>
            <h1>API Operation Logger</h1>
            <p>This component logs API operations to the backend.</p>
        </div>
    );
};

export default SomeComponent;
