import React, { useEffect, useState } from 'react';
import '../bootstrap-5.3.3-dist/css/bootstrap.min.css';
import EmployeeApi from '../api/Employee';
import DepartmentApi from '../api/Department';
import { Card, Space, Button, Input, Select, TextArea } from '@douyinfe/semi-ui';
import NavApp from "../Header";

const EmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [departmentMap, setDepartmentMap] = useState({});
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
                const departmentsData = response.data;
                setDepartments(departmentsData);
                const deptMap = {};
                departmentsData.forEach(department => {
                    deptMap[department.id] = department.name;
                });
                setDepartmentMap(deptMap);
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

    return (
        <div>
            <NavApp />
            <div className='mt-5 ms-5'>
                <Card
                    style={{ width: '800px', marginBottom: '20px' }}
                    hoverable
                    title='Add Employee'
                >
                    <Input
                        type='text'
                        placeholder="First Name"
                        size='large'
                        value={newEmployeeData.first_name}
                        onChange={(e) => setNewEmployeeData({ ...newEmployeeData, first_name: e })}
                    />
                    <br /><br />
                    <Input
                        type='text'
                        placeholder="Last Name"
                        size='large'
                        value={newEmployeeData.last_name}
                        onChange={(e) => setNewEmployeeData({ ...newEmployeeData, last_name: e })}
                    />
                    <br /><br />
                    <Input
                        type='text'
                        placeholder="Position"
                        size='large'
                        value={newEmployeeData.position}
                        onChange={(e) => setNewEmployeeData({ ...newEmployeeData, position: e })}
                    />
                    <br /><br />
                    <Input
                        type='number'
                        placeholder="Age"
                        size='large'
                        value={newEmployeeData.age}
                        onChange={(e) => setNewEmployeeData({ ...newEmployeeData, age: e })}
                    />
                    <br /><br />
                    <TextArea
                        type="text"
                        placeholder="Address"
                        maxCount={1000}
                        showClear
                        value={newEmployeeData.address}
                        onChange={(e) => setNewEmployeeData({ ...newEmployeeData, address: e })}
                        className="input-description"
                    />
                    <br /><br />
                    <Input
                        type='email'
                        placeholder="Email"
                        size='large'
                        value={newEmployeeData.email}
                        onChange={(e) => setNewEmployeeData({ ...newEmployeeData, email: e })}
                    />
                    <br /><br />
                    <Input
                        type='tel'
                        placeholder="Phone Number"
                        size='large'
                        value={newEmployeeData.phone_number}
                        onChange={(e) => setNewEmployeeData({ ...newEmployeeData, phone_number: e })}
                    />
                    <br /><br />
                    <Select
                        placeholder="Select Department"
                        size='large'
                        value={newEmployeeData.department}
                        onChange={(value) => setNewEmployeeData({ ...newEmployeeData, department: value })}
                        style={{ width: 120 }}
                    >
                        {departments.map(department => (
                            <Select.Option key={department.id} value={department.id}>{department.name}</Select.Option>
                        ))}
                    </Select>
                    <br /><br />
                    <Input
                        type="text"
                        placeholder="Photo URL"
                        size='large'
                        value={newEmployeeData.photo}
                        onChange={(e) => setNewEmployeeData({ ...newEmployeeData, photo: e })}
                    />
                    <br /><br />
                    <Button type='primary' onClick={createEmployee}>Add</Button>
                    <br /><br />
                </Card>
            </div>

            <br /><br />

            <div className="row row-cols-1 row-cols-md-6 g-auto me-5 ms-5">
                {employees.map(employee => (
                    <div key={employee.id} className="col">
                        <Card
                            style={{ marginBottom: '20px' }}
                            hoverable
                            title='Employee'
                            cover={<img src={employee.photo} alt={`${employee.first_name} ${employee.last_name}`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />}
                        >
                            <div className="card-body">
                                <h5 className="card-title">Name: {employee.first_name} {employee.last_name}</h5>
                                <p className="card-text">Position: {employee.position}</p>
                                <p className="card-text">Age: {employee.age}</p>
                                <p className="card-text">Department: {departmentMap[employee.department]}</p>
                                <p className="card-text">Email: {employee.email}</p>
                                <p className="card-text">Phone Number: {employee.phone_number}</p>
                                <p className="card-text">Address: {employee.address}</p>
                                <Space>
                                    <Button type="danger" onClick={() => deleteEmployee(employee.id)}>Delete</Button>
                                    <Button type="primary" onClick={() => editEmployee(employee.id, employee)}>Edit</Button>
                                </Space>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EmployeeComponent;
