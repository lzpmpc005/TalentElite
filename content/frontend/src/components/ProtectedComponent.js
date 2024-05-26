import React, { useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import { Card } from '@douyinfe/semi-ui';
import NavApp from '../Header';

const ProtectedComponent = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchProtectedData();
    }, []);

    const fetchProtectedData = () => {
        api.get('/protected/')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching protected data:', error);
            });
    };

    return (
        <div>
            <NavApp />
            <div className='mt-5 ms-5'>
                <Card
                    style={{ width: '100%', marginBottom: '20px' }}
                    hoverable
                    title='Protected Data'
                >
                    {data ? (
                        <pre>{JSON.stringify(data, null, 2)}</pre>
                    ) : (
                        <p>Loading...</p>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default ProtectedComponent;
