import React, { useState, useEffect } from 'react';
import logApi from '../api/LogApi';
import { Table, Card, Pagination } from '@douyinfe/semi-ui';
import NavApp from '../Header';

const LogComponent = () => {
    const [logs, setLogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalLogs, setTotalLogs] = useState(0);

    useEffect(() => {
        fetchLogs(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const fetchLogs = (page, pageSize) => {
        logApi.getLogs()
            .then(response => {
                setLogs(response.data);
                setTotalLogs(response.data.length); // Assuming the total number of logs can be derived from the data length
            })
            .catch(error => {
                console.error('Error fetching logs:', error);
            });
    };

    const columns = [
        {
            title: 'Timestamp',
            dataIndex: 'timestamp',
            key: 'timestamp',
        },
        {
            title: 'Method',
            dataIndex: 'method',
            key: 'method',
        },
        {
            title: 'Endpoint',
            dataIndex: 'endpoint',
            key: 'endpoint',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
            render: (text) => <span>{text ? `${text.toFixed(3)}s` : 'N/A'}</span>,
        },
    ];

    return (
        <div>
            <NavApp />
            <div className='mt-5 ms-5'>
                <Card
                    style={{ width: '100%', marginBottom: '20px' }}
                    hoverable
                    title='API Logs'
                >
                    <Table 
                        columns={columns} 
                        dataSource={logs.slice((currentPage - 1) * pageSize, currentPage * pageSize)} 
                        pagination={false} 
                    />
                    <Pagination
                        total={totalLogs}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={(page) => setCurrentPage(page)}
                        onPageSizeChange={(size) => setPageSize(size)}
                    />
                </Card>
            </div>
        </div>
    );
};

export default LogComponent;
