import React, { useEffect, useState } from 'react';
import DepartmentApi from '../api/Department';
import { Card, Button, TextArea, Input } from '@douyinfe/semi-ui';
import NavApp from "../Header";

const DepartmentComponent = () => {
    const [departments, setDepartments] = useState([]);
    const [newDepartmentData, setNewDepartmentData] = useState({ name: '', descripation: '' });
    const [editDepartmentId, setEditDepartmentId] = useState(null);
    const [editDepartmentData, setEditDepartmentData] = useState({ name: '', descripation: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = () => {
        DepartmentApi.getAllDepartments()
            .then(response => {
                setDepartments(response.data);
            })
            .catch(error => {
                console.error('Error fetching departments:', error);
            });
    };

    const createDepartment = () => {
        DepartmentApi.createDepartment(newDepartmentData)
            .then(response => {
                fetchDepartments();
                setNewDepartmentData({ name: '', descripation: '' });
            })
            .catch(error => {
                console.error('Error creating department:', error);
            });
    };

    const deleteDepartment = (departmentId) => {
        DepartmentApi.deleteDepartment(departmentId)
            .then(response => {
                fetchDepartments();
            })
            .catch(error => {
                console.error('Error deleting department:', error);
            });
    };

    const editDepartment = (departmentId, departmentData) => {
        setEditDepartmentId(departmentId);
        setEditDepartmentData(departmentData);
        setIsEditing(true);
    };

    const saveEditDepartment = () => {
        DepartmentApi.updateDepartment(editDepartmentId, editDepartmentData)
            .then(response => {
                fetchDepartments();
                setEditDepartmentId(null);
                setEditDepartmentData({ name: '', descripation: '' });
                setIsEditing(false);
            })
            .catch(error => {
                console.error('Error updating department:', error);
            });
    };

    const cancelEditDepartment = () => {
        setEditDepartmentId(null);
        setEditDepartmentData({ name: '', descripation: '' });
        setIsEditing(false);
    };

    return (
        <div>
            <NavApp/>
            <div className='mt-5 ms-5'>
                <Card
                    style={{width: '800px', marginBottom: '20px'}}
                    hoverable
                    title='Add Department'
                >
                    <Input
                        type="text"
                        placeholder="Name"
                        value={newDepartmentData.name}
                        onChange={(e) => setNewDepartmentData({...newDepartmentData, name: e})}
                    />
                    <br/><br/>
                    <TextArea
                        maxCount={1000}
                        showClear
                        type="text"
                        placeholder="Descripation"
                        value={newDepartmentData.descripation}
                        onChange={(e) => setNewDepartmentData({...newDepartmentData, descripation: e})}
                    />
                    <br/><br/>
                    <Button onClick={createDepartment}>Add</Button>
                    <br/><br/>
                </Card>
            </div>
            <br/><br/>
            <div className='row row-cols-auto row-cols-md-5 g-auto me-5 ms-5 gap-5'>
                {departments.map(department => (
                    <Card
                        key={department.id}
                        title={department.name}
                        style={{width: '300px', marginBottom: '20px'}}
                        actions={[
                            <Button key="edit" onClick={() => editDepartment(department.id)}>Edit</Button>,
                            <Button type="danger" onClick={() => deleteDepartment(department.id)}>Delete</Button>
                        ]}
                    >
                        {department.descripation}
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default DepartmentComponent;
