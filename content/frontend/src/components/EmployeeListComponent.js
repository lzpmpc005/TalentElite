import React, { useEffect, useState } from 'react';
import EmployeeApi from '../api/Employee';
import DepartmentApi from '../api/Department';
import { Table, Button, Select, Card, Input } from '@douyinfe/semi-ui';
import NavApp from "../Header";

const EmployeeListComponent = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployeeData, setNewEmployeeData] = useState({
        first_name: '',
        last_name: '',
        position: '',
        age: '',
        department: '',
        email: '',
        phone_number: '',
        address: '',
        photo: ''
    });
    const [editEmployeeId, setEditEmployeeId] = useState(null);
    const [editEmployeeData, setEditEmployeeData] = useState({
        first_name: '',
        last_name: '',
        position: '',
        age: '',
        department: '',
        email: '',
        phone_number: '',
        address: '',
        photo: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        fetchEmployees();
        fetchDepartments();
    }, []);

    const fetchEmployees = () => {
        EmployeeApi.getAllEmployees()
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.error('Error fetching employees:', error);
            });
    };

    const fetchDepartments = () => {
        DepartmentApi.getAllDepartments()
            .then(response => {
                setDepartments(response.data);
            })
            .catch(error => {
                console.error('Error fetching departments:', error);
            });
    };

    const createEmployee = () => {
        EmployeeApi.createEmployee(newEmployeeData)
            .then(response => {
                fetchEmployees();
                setNewEmployeeData({
                    first_name: '',
                    last_name: '',
                    position: '',
                    age: '',
                    department: '',
                    email: '',
                    phone_number: '',
                    address: '',
                    photo: ''
                });
            })
            .catch(error => {
                console.error('Error creating employee:', error);
            });
    };

    const deleteEmployee = (employeeId) => {
        EmployeeApi.deleteEmployee(employeeId)
            .then(response => {
                fetchEmployees();
            })
            .catch(error => {
                console.error('Error deleting employee:', error);
            });
    };

    const editEmployee = (employeeId, employeeData) => {
        setEditEmployeeId(employeeId);
        setEditEmployeeData(employeeData);
        setIsEditing(true);
    };

    const saveEditEmployee = () => {
        EmployeeApi.updateEmployee(editEmployeeId, editEmployeeData)
            .then(response => {
                fetchEmployees();
                setEditEmployeeId(null);
                setEditEmployeeData({
                    first_name: '',
                    last_name: '',
                    position: '',
                    age: '',
                    department: '',
                    email: '',
                    phone_number: '',
                    address: '',
                    photo: ''
                });
                setIsEditing(false);
            })
            .catch(error => {
                console.error('Error updating employee:', error);
            });
    };

    const cancelEditEmployee = () => {
        setEditEmployeeId(null);
        setEditEmployeeData({
            first_name: '',
            last_name: '',
            position: '',
            age: '',
            department: '',
            email: '',
            phone_number: '',
            address: '',
            photo: ''
        });
        setIsEditing(false);
    };

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'first_name',
            render: (text, record) => (
                isEditing && editEmployeeId === record.id ? (
                    <Input value={editEmployeeData.first_name} onChange={(e) => setEditEmployeeData({ ...editEmployeeData, first_name: e })} />
                ) : (
                    <span>{text}</span>
                )
            ),
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            render: (text, record) => (
                isEditing && editEmployeeId === record.id ? (
                    <Input value={editEmployeeData.last_name} onChange={(e) => setEditEmployeeData({ ...editEmployeeData, last_name: e })} />
                ) : (
                    <span>{text}</span>
                )
            ),
        },
        {
            title: 'Position',
            dataIndex: 'position',
            render: (text, record) => (
                isEditing && editEmployeeId === record.id ? (
                    <Input value={editEmployeeData.position} onChange={(e) => setEditEmployeeData({ ...editEmployeeData, position: e })} />
                ) : (
                    <span>{text}</span>
                )
            ),
        },
        {
            title: 'Age',
            dataIndex: 'age',
            render: (text, record) => (
                isEditing && editEmployeeId === record.id ? (
                    <Input value={editEmployeeData.age} onChange={(e) => setEditEmployeeData({ ...editEmployeeData, age: e })} />
                ) : (
                    <span>{text}</span>
                )
            ),
        },
        {
            title: 'Department',
            dataIndex: ['department', 'name'], // 这里使用路径访问嵌套的对象
            render: (text, record) => (
                isEditing && editEmployeeId === record.id ? (
                    <Select value={editEmployeeData.department} onChange={(value) => setEditEmployeeData({ ...editEmployeeData, department: value })}>
                        {departments.map(option => (
                            <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>
                        ))}
                    </Select>
                ) : (
                    <span>{text}</span>
                )
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            render: (text, record) => (
                isEditing && editEmployeeId === record.id ? (
                    <Input value={editEmployeeData.email} onChange={(e) => setEditEmployeeData({ ...editEmployeeData, email: e })} />
                ) : (
                    <span>{text}</span>
                )
            ),
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone_number',
            render: (text, record) => (
                isEditing && editEmployeeId === record.id ? (
                    <Input value={editEmployeeData.phone_number} onChange={(e) => setEditEmployeeData({ ...editEmployeeData, phone_number: e })} />
                ) : (
                    <span>{text}</span>
                )
            ),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            render: (text, record) => (
                isEditing && editEmployeeId === record.id ? (
                    <Input value={editEmployeeData.address} onChange={(e) => setEditEmployeeData({ ...editEmployeeData, address: e })} />
                ) : (
                    <span>{text}</span>
                )
            ),
        },
        {
            title: '',
            dataIndex: 'operate',
            render: (text, record) => (
                isEditing && editEmployeeId === record.id ? (
                    <div>
                        <Button onClick={saveEditEmployee}>Save</Button>
                        <Button onClick={cancelEditEmployee}>Cancel</Button>
                    </div>
                ) : (
                    <div>
                        <Button onClick={() => editEmployee(record.id, record)}>Edit</Button>
                        <Button onClick={() => deleteEmployee(record.id)}>Delete</Button>
                    </div>
                )
            ),
        },
    ];

    return (
        <div>
            <NavApp />
            <div className='mt-5 ms-5'>
                <Card
                    style={{ width: '800px', marginBottom: '20px' }}
                    hoverable
                    title='Add Employee'
                >
                    <Input type="text" placeholder="First Name" value={newEmployeeData.first_name}
                           onChange={(e) => setNewEmployeeData({ ...newEmployeeData, first_name: e })} />
                    <Input type="text" placeholder="Last Name" value={newEmployeeData.last_name}
                           onChange={(e) => setNewEmployeeData({ ...newEmployeeData, last_name: e })} />
                    <Input type="text" placeholder="Position" value={newEmployeeData.position}
                           onChange={(e) => setNewEmployeeData({ ...newEmployeeData, position: e })} />
                    <Input type="number" placeholder="Age" value={newEmployeeData.age}
                           onChange={(e) => setNewEmployeeData({ ...newEmployeeData, age: e })} />
                    <Input type="text" placeholder="Address" value={newEmployeeData.address}
                           onChange={(e) => setNewEmployeeData({ ...newEmployeeData, address: e })} />
                    <Input type="email" placeholder="Email" value={newEmployeeData.email}
                           onChange={(e) => setNewEmployeeData({ ...newEmployeeData, email: e })} />
                    <Input type="tel" placeholder="Phone Number" value={newEmployeeData.phone_number}
                           onChange={(e) => setNewEmployeeData({ ...newEmployeeData, phone_number: e })} />
                    <Select placeholder="Select Department" value={newEmployeeData.department}
                            onChange={(value) => setNewEmployeeData({ ...newEmployeeData, department: value })}>
                        {departments.map(option => (
                            <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>
                        ))}
                    </Select>
                    <Input type="text" placeholder="Photo URL" value={newEmployeeData.photo}
                           onChange={(e) => setNewEmployeeData({ ...newEmployeeData, photo: e })} />
                    <Button onClick={createEmployee}>Add</Button>
                </Card>
            </div>
            <Table title='Employees' columns={columns} dataSource={employees} />
        </div>
    );
};

export default EmployeeListComponent;
