import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Typography } from '@douyinfe/semi-ui';
import { IconUser, IconLock } from '@douyinfe/semi-icons';

const { Title } = Typography;

const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // 直接重定向到 /Employees 页面
        navigate('/Employees');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ width: 400, padding: 24 }}>
                <Title heading={3} style={{ textAlign: 'center', marginBottom: 24 }}>Login</Title>
                <Form>
                    <Form.Input
                        field='username'
                        label='Username'
                        prefix={<IconUser />}
                        placeholder='Enter your username'
                        value={username}
                        onChange={(e) => setUsername(e)}
                    />
                    <Form.Input
                        field='password'
                        label='Password'
                        prefix={<IconLock />}
                        placeholder='Enter your password'
                        mode='password'
                        value={password}
                        onChange={(e) => setPassword(e)}
                    />
                    <Button
                        theme='solid'
                        type='primary'
                        onClick={handleLogin}
                        style={{ width: '100%', marginTop: 24 }}
                    >
                        Login
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default LoginComponent;
