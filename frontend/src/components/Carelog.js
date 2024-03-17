import React, { useEffect, useState } from 'react';
import AnimalApi from '../api/Animal';
import ZookeeperApi from '../api/Zookeeper';
import CarelogApi from '../api/Carelog';
import { Table,Card, Space, Button, Typography,TextArea,Input ,Select,Text} from '@douyinfe/semi-ui';
const CarelogComponent = () => {
    const [carelogs, setCarelogs] = useState([]);
    const [animals, setAnimals] = useState([]);
    const [caretakers, setCaretakers] = useState([]);
    const [newCarelogData, setNewCarelogData] = useState({ animal: '', description: '', caretaker: '' });
    const [editCarelogId, setEditCarelogId] = useState(null);
    const [editCarelogData, setEditCarelogData] = useState({ animal: '', description: '', caretaker: '' });
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {
        fetchCarelogs();
        fetchAnimals();
        fetchCaretakers();
    }, []);

    const fetchCarelogs = () => {
        CarelogApi.getAllCarelogs()
            .then(response => {
                setCarelogs(response.data);
            })
            .catch(error => {
                console.error('Error fetching carelogs:', error);
            });
    };

    const fetchAnimals = () => {
        AnimalApi.getAllAnimals()
            .then(response => {
                setAnimals(response.data);
            })
            .catch(error => {
                console.error('Error fetching animals:', error);
            });
    };

    const fetchCaretakers = () => {
        ZookeeperApi.getAllZookeepers()
            .then(response => {
                setCaretakers(response.data);
            })
            .catch(error => {
                console.error('Error fetching caretakers:', error);
            });
    };

    const handleNewCarelogChange = (e) => {
        const { name, value } = e.target;
        setNewCarelogData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const createCarelog = () => {
        CarelogApi.createCarelog(newCarelogData)
            .then(response => {
                fetchCarelogs();
                setNewCarelogData({ animal: '', description: '', caretaker: '' });
            })
            .catch(error => {
                console.error('Error creating carelog:', error);
            });
    };

    const editCarelog = (carelogId, carelogData) => {
        setEditCarelogId(carelogId);
        setEditCarelogData(carelogData);
        setIsEditing(true);
    };

    const saveEditCarelog = () => {
        CarelogApi.updateCarelog(editCarelogId, editCarelogData)
            .then(response => {
                fetchCarelogs();
                setEditCarelogId(null);
                setEditCarelogData({
                    animal: '',
                    description: '',
                    caretaker: ''
                });

            setIsEditing(false); // 退出编辑模式
    })
            .catch(error => {
                console.error('Error updating carelog:', error);
            });
    };

    const cancelEditCarelog = () => {
        setEditCarelogId(null);
        setEditCarelogData({ animal: '', description: '', caretaker: '' });
    };

    const deleteCarelog = (carelogId) => {
        CarelogApi.deleteCarelog(carelogId)
            .then(response => {
                fetchCarelogs();
            })
            .catch(error => {
                console.error('Error deleting carelog:', error);
            });
    };
    const columns = [
        {
            title: 'Animal',
            dataIndex: 'animal',
            render: (animalId, record) => (
                isEditing && editCarelogId === record.id ? (
                    <Select value={editCarelogData.animal} onChange={(e) => setEditCarelogData({ ...editCarelogData, animal: e })}>

                    {animals.map(animal => (
                            <Select.Option key={animal.id} value={animal.id}>{animal.name}</Select.Option>
                        ))}
                    </Select>
                ) : (
                    animals.find(animal => animal.id === animalId)?.name || 'Unknown'
                )
            )
        },
        {
            title: 'Description',
            dataIndex: 'description',
            render: (text, record) => (
                isEditing && editCarelogId === record.id ? (
                    <Input value={editCarelogData.description} onChange={(e) => setEditCarelogData({ ...editCarelogData, description: e })} />
                ) : (
                    text
                )
            )
        },
        {
            title: 'Caretaker',
            dataIndex: 'caretaker',
            render: (caretakerId, record) => (
                isEditing && editCarelogId === record.id ? (
                    <Select value={editCarelogData.caretaker} onChange={(e) => setEditCarelogData({ ...editCarelogData, caretaker: e })}>

                    {caretakers.map(caretaker => (
                            <Select.Option key={caretaker.id} value={caretaker.id}>{caretaker.name}</Select.Option>
                        ))}
                    </Select>
                ) : (
                    caretakers.find(caretaker => caretaker.id === caretakerId)?.name || 'Unknown'
                )
            )
        },
        {
            title: 'Date',
            dataIndex: 'date',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <Space>
                    {isEditing && editCarelogId === record.id ? (
                        <>
                            <Button type="primary" onClick={saveEditCarelog}>Save</Button>
                            <Button onClick={cancelEditCarelog}>Cancel</Button>
                        </>
                    ) : (
                        <>
                            <Button type="danger" onClick={() => deleteCarelog(record.id)}>Delete</Button>
                            <Button type="primary" onClick={() => editCarelog(record.id, record)}>Edit</Button>
                        </>
                    )}
                </Space>
            )
        },
    ];

    return (
        <div>
            <div className='mt-5 ms-5'>
                <Card
                    style={{width: '800px', marginBottom: '20px'}} // 调整卡片间距
                    hoverable // 可悬停效果
                    title='Add Carelogs'
                >
                    <Select
                        placeholder="Select Animal"
                        size='large'
                        value={newCarelogData.animal}
                        onChange={handleNewCarelogChange}>
                        <option value="">Select Animal</option>
                        {animals.map(animal => (
                            <Select.Option key={animal.id} value={animal.id}>{animal.name}</Select.Option>
                        ))}
                    </Select>
                    <br/><br/>
                    <Select
                        size='large'
                        placeholder="Select Zookeeper"
                        value={newCarelogData.caretaker}
                        onChange={handleNewCarelogChange}>

                        <option value="">Select Caretaker</option>
                        {caretakers.map(caretaker => (
                            <Select.Option key={caretaker.id} value={caretaker.id}>{caretaker.name}</Select.Option>
                        ))}
                    </Select>
                    <br/><br/>
                    <TextArea
                        maxCount={1000}
                        showClear
                        type="text"
                        name="description"
                        value={newCarelogData.description}
                        onChange={handleNewCarelogChange}
                        placeholder="Description"/>
                    <br/><br/>
                    <Button onClick={createCarelog}>Add</Button>
                    <br/><br/>
                </Card>
            </div>
            <br/><br/>

            <Table columns={columns} dataSource={carelogs} />
        </div>
    );
};

export default CarelogComponent;