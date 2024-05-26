import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Card, Input } from '@douyinfe/semi-ui';
import NavApp from "../Header";

const BackupPage = () => {
    const [directoryTree, setDirectoryTree] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchDirectoryTree();
    }, []);

    const fetchDirectoryTree = () => {
        axios.get('http://localhost:8000/api/directory_tree/')
            .then(response => {
                setDirectoryTree(response.data.directory_tree);
            })
            .catch(error => {
                console.error('Error fetching directory tree:', error);
                setMessage('Failed to fetch directory tree');
            });
    };

    const executeBackup = () => {
        axios.post('http://localhost:8080/backup')
            .then(response => {
                setMessage(response.data);
                fetchDirectoryTree(); // 重新获取目录树
            })
            .catch(error => {
                console.error('Error executing backup:', error);
                if (error.response && error.response.data) {
                    setMessage(error.response.data);
                } else {
                    setMessage('Executed backup');
                }
            });
    };

    const columns = [
        {
            title: 'File Name',
            dataIndex: 'file',
            render: (text) => (
                <span>{text}</span>
            ),
        },
    ];

    const dataSource = directoryTree.map((file, index) => ({
        key: index,
        file: file,
    }));

    return (
        <div>
            <NavApp />
            <div className='mt-5 ms-5'>
                <Card
                    style={{ width: '800px', marginBottom: '20px' }}
                    hoverable
                    title='Execute Backup'
                >
                    <Button onClick={executeBackup}>Execute Backup</Button>
                    <p>{message}</p>
                </Card>
            </div>
            <Table title='Existing Backups' columns={columns} dataSource={dataSource} />
        </div>
    );
};

export default BackupPage;
