import React, { useEffect, useState } from 'react';
import MemberApi from '../api/MemberApi';
import { Table, Avatar, Button, Select,Card } from '@douyinfe/semi-ui';
import { IconMore } from '@douyinfe/semi-icons';

const MemberComponent = () => {
    const [members, setMembers] = useState([]);
    const [newMemberData, setNewMemberData] = useState({ username: '', password: '', full_name: '', email: '', ticket_period: '', ticket_type: '' });
    const [editMemberId, setEditMemberId] = useState(null);
    const [editMemberData, setEditMemberData] = useState({ username: '', password: '', full_name: '', email: '', ticket_period: '', ticket_type: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [ticketPeriodOptions, setTicketPeriodOptions] = useState(['day', 'week', 'month', 'year']);
    const [ticketTypeOptions, setTicketTypeOptions] = useState(['adult', 'child']);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = () => {
        MemberApi.getMembers()
            .then(response => {
                setMembers(response.data);
            })
            .catch(error => {
                console.error('Error fetching members:', error);
            });
    };

    const createNewMember = () => {
        MemberApi.createMember(newMemberData)
            .then(response => {
                fetchMembers();
                setNewMemberData({ username: '', password: '', full_name: '', email: '', ticket_period: '', ticket_type: '' });
            })
            .catch(error => {
                console.error('Error creating new member:', error);
            });
    };

    const deleteMemberById = (memberId) => {
        MemberApi.deleteMember(memberId)
            .then(response => {
                fetchMembers();
            })
            .catch(error => {
                console.error('Error deleting member:', error);
            });
    };

    const editMemberById = (memberId, memberData) => {
        setEditMemberId(memberId);
        setEditMemberData(memberData);
        setIsEditing(true);
    };

    const saveEditedMember = () => {
        MemberApi.updateMember(editMemberId, editMemberData)
            .then(response => {
                fetchMembers(); // 更新成员列表
                setEditMemberId(null); // 重置编辑状态
                setEditMemberData({ // 清空编辑数据
                    username: '',
                    password: '',
                    full_name: '',
                    email: '',
                    ticket_period: '',
                    ticket_type: ''
                });
                setIsEditing(false); // 退出编辑模式
            })
            .catch(error => {
                console.error('Error updating member:', error);
            });
    };

    const cancelEditMember = () => {
        setEditMemberId(null);
        setEditMemberData({ username: '', password: '', full_name: '', email: '', ticket_period: '', ticket_type: '' });
        setIsEditing(false);
    };

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            render: (text, record) => (
                isEditing && editMemberId === record.id ? (
                    <input type="text" value={editMemberData.username} onChange={(e) => setEditMemberData({ ...editMemberData, username: e.target.value })} />
                ) : (
                    <span>{text}</span>
                )
            ),
        },
        {
            title: 'Full Name',
            dataIndex: 'full_name',
            render: (text, record) => (
                isEditing && editMemberId === record.id ? (
                    <input type="text" value={editMemberData.full_name} onChange={(e) => setEditMemberData({ ...editMemberData, full_name: e.target.value })} />
                ) : (
                    <span>{text}</span>
                )
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            render: (text, record) => (
                isEditing && editMemberId === record.id ? (
                    <input type="email" value={editMemberData.email} onChange={(e) => setEditMemberData({ ...editMemberData, email: e.target.value })} />
                ) : (
                    <span>{text}</span>
                )
            ),
        },
        {
            title: 'Ticket Period',
            dataIndex: 'ticket_period',
            render: (text, record) => (
                isEditing && editMemberId === record.id ? (
                    <Select value={editMemberData.ticket_period} onChange={(value) => setEditMemberData({ ...editMemberData, ticket_period: value })}>
                        {ticketPeriodOptions.map(option => (
                            <Select.Option key={option} value={option}>{option}</Select.Option>
                        ))}
                    </Select>
                ) : (
                    <span>{text}</span>
                )
            ),
        },
        {
            title: 'Ticket Type',
            dataIndex: 'ticket_type',
            render: (text, record) => (
                isEditing && editMemberId === record.id ? (
                    <Select value={editMemberData.ticket_type} onChange={(value) => setEditMemberData({ ...editMemberData, ticket_type: value })}>
                        {ticketTypeOptions.map(option => (
                            <Select.Option key={option} value={option}>{option}</Select.Option>
                        ))}
                    </Select>
                ) : (
                    <span>{text}</span>
                )
            ),
        },
        {
            title: '',
            dataIndex: 'operate',
            render: (text, record) => (
                isEditing && editMemberId === record.id ? (
                    <div>
                        <Button onClick={() => saveEditedMember()}>Save</Button>
                        <Button onClick={() => cancelEditMember()}>Cancel</Button>
                    </div>
                ) : (
                    <div>
                        <Button onClick={() => editMemberById(record.id, record)}>Edit</Button>
                        <Button onClick={() => deleteMemberById(record.id)}>Delete</Button>
                    </div>
                )
            ),
        },
    ];

    return (
        <div>
            <div className='mt-5 ms-5'>
                <Card
                    style={{width: '800px', marginBottom: '20px'}} // 调整卡片间距
                    hoverable // 可悬停效果
                    title='Add Members'
                >
                    <input type="text" placeholder="Username" value={newMemberData.username}
                           onChange={(e) => setNewMemberData({...newMemberData, username: e.target.value})}/>

                    <input type="text" placeholder="Password" value={newMemberData.password}
                           onChange={(e) => setNewMemberData({...newMemberData, password: e.target.value})}/>
                    <br/><br/>
                    <input type="text" placeholder="Full Name" value={newMemberData.full_name}
                           onChange={(e) => setNewMemberData({...newMemberData, full_name: e.target.value})}/>

                    <input type="email" placeholder="Email" value={newMemberData.email}
                           onChange={(e) => setNewMemberData({...newMemberData, email: e.target.value})}/>
                    <br/><br/>
                    <Select
                        placeholder="Select ticket period"
                        value={newMemberData.ticket_period}
                        onChange={(value) => setNewMemberData({...newMemberData, ticket_period: value})}>
                        {ticketPeriodOptions.map(option => (
                            <Select.Option key={option} value={option}>{option}</Select.Option>
                        ))}
                    </Select>
                    <Select
                        placeholder="Select ticket type"
                        value={newMemberData.ticket_type}
                        onChange={(value) => setNewMemberData({...newMemberData, ticket_type: value})}>
                        {ticketTypeOptions.map(option => (
                            <Select.Option key={option} value={option}>{option}</Select.Option>
                        ))}
                    </Select>
                    <br/><br/>
                    <Button onClick={createNewMember}>Add</Button>
                </Card>
            </div>


            <Table title='Members' columns={columns} dataSource={members} />
        </div>
    );
};

export default MemberComponent;
