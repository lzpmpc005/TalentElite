import React, { useEffect, useState } from 'react';
import TourScheduleApi from "../api/tour_schedules";
import HabitatApi from "../api/Habitat";
import MemberApi from "../api/MemberApi";
import {Modal,Table, Card, Space, Button, Input, TextArea, Select} from '@douyinfe/semi-ui';
import NavApp from "../Header";
import HabitatStatusComponent from "./HabitatStatusComponent";
const TourScheduleComponent = () => {
    const [tourSchedules, setTourSchedules] = useState([]);
    const [newTourScheduleData, setNewTourScheduleData] = useState({ name: '', start_time: '', end_time: '', description: '', habitats: [], members: [] });
    const [habitats, setHabitats] = useState([]);
    const [members, setMembers] = useState([]);
    const [editTourScheduleId, setEditTourScheduleId] = useState(null);
    const [editTourScheduleData, setEditTourScheduleData] = useState({ name: '', start_time: '', end_time: '', description: '', habitats: [], members: [] });
    const [isEditing, setIsEditing] = useState(false);
    const [occupiedHabitats, setOccupiedHabitats] = useState([]);

    useEffect(() => {
        fetchTourSchedules();
        fetchMembers();
        fetchHabitats();
    }, []);



    const fetchTourSchedules = () => {
        TourScheduleApi.getAllTourSchedules()
            .then(response => {
                setTourSchedules(response.data);
            })
            .catch(error => {
                console.error('Error fetching tour schedules:', error);
            });
    };
    const fetchHabitats = () => {
        HabitatApi.getAllHabitats()
            .then(response => {
                setHabitats(response.data);
            })
            .catch(error => {
                console.error('Error fetching habitats:', error);
            });
    };
    const fetchMembers = () => {
        MemberApi.getMembers()
            .then(response => {
                setMembers(response.data);
            })
            .catch(error => {
                console.error('Error fetching members:', error);
            });
    };
    const handleNewTourScheduleChange = (value, name) => {
        setNewTourScheduleData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const createTourSchedule = () => {
        TourScheduleApi.createTourSchedule(newTourScheduleData)
            .then(response => {
                fetchTourSchedules();
                setNewTourScheduleData({ name: '', start_time: '', end_time: '', description: '', habitats: [], members: [] });
            })
            .catch(error => {
                console.error('Error creating tour schedule:', error);
            });
    };

    const editTourSchedule = (tourScheduleId) => {
        const tourScheduleToEdit = tourSchedules.find(schedule => schedule.id === tourScheduleId);
        if (tourScheduleToEdit) {
            setEditTourScheduleId(tourScheduleId);
            setEditTourScheduleData(tourScheduleToEdit);
            setIsEditing(true);
        } else {
            console.error('Tour schedule not found for editing');
        }
    };

    const saveEditTourSchedule = () => {
        TourScheduleApi.updateTourSchedule(editTourScheduleId, editTourScheduleData)
            .then(response => {
                fetchTourSchedules();
                setEditTourScheduleId(null);
                setEditTourScheduleData({ name: '', start_time: '', end_time: '', description: '', habitats: [], members: [] });
                setIsEditing(false);
            })
            .catch(error => {
                console.error('Error updating tour schedule:', error);
            });
    };

    const cancelEditTourSchedule = () => {
        setEditTourScheduleId(null);
        setEditTourScheduleData({ name: '', start_time: '', end_time: '', description: '', habitats: [], members: [] });
        setIsEditing(false);
    };

    const deleteTourSchedule = (tourScheduleId) => {
        TourScheduleApi.deleteTourSchedule(tourScheduleId)
            .then(response => {
                fetchTourSchedules();
            })
            .catch(error => {
                console.error('Error deleting tour schedule:', error);
            });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                isEditing && editTourScheduleId === record.id ? (
                    <Input value={editTourScheduleData.name} onChange={(e) => setEditTourScheduleData({ ...editTourScheduleData,name: e})} />
                ) : (
                    text
                )
            )
        },
        {
            title: 'Start Time',
            dataIndex: 'start_time',
            key: 'start_time',
            render: (text, record) => (
                isEditing && editTourScheduleId === record.id ? (
            <Input value={editTourScheduleData.start_time} onChange={(e) => setEditTourScheduleData({ ...editTourScheduleData, start_time: e })} />
        ) : (
            text
        )
)
},
        {
            title: 'End Time',
            dataIndex: 'end_time',
            key: 'end_time',
            render: (text, record) => (
                 isEditing && editTourScheduleId === record.id ? (
                    <Input value={editTourScheduleData.end_time} onChange={(e) => setEditTourScheduleData({ ...editTourScheduleData, end_time: e })} />
                ) : (
                    text
                )
            )
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text, record) => (
                isEditing && editTourScheduleId === record.id ? (
                    <Input value={editTourScheduleData.description} onChange={(e) => setEditTourScheduleData({ ...editTourScheduleData, description: e })} />
                ) : (
                    text
                )
            )
        },
        {
            title: 'Habitat',
            dataIndex: 'habitat',
            render: (text, record) => (
                isEditing && editTourScheduleId === record.id ? (
                    <Select multiple value={editTourScheduleData.habitat} onChange={(value) => setEditTourScheduleData({ ...editTourScheduleData, habitat: value })}>
                        {habitats.map(habitat => (
                            <Select.Option key={habitat.id} value={habitat.id}>{habitat.name}</Select.Option>
                        ))}
                    </Select>
                ) : (
                    habitats.filter(habitat => record.habitat.includes(habitat.id)).map(habitat => habitat.name).join(', ')
                )
            )
        },
        {
        title: 'Member',
            dataIndex: 'member',
            render: (text, record) => (
                isEditing && editTourScheduleId === record.id ? (
                <Select
                    multiple
                    value={editTourScheduleData.member}
                    onChange={(value) => setEditTourScheduleData({ ...editTourScheduleData, member: value })}
                    style={{ width: '320px' }} // 设置选择框的宽度
                >
                    {members.map(member => (
                        <Select.Option key={member.id} value={member.id}>{member.full_name}</Select.Option>
                    ))}
                </Select>
            ) : (
                members.filter(member => record.member.includes(member.id)).map(member => `${member.full_name}`).join(', ')
            )
        )
    },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    {isEditing && editTourScheduleId === record.id ? (
                        <>
                            <Button type="primary" onClick={saveEditTourSchedule}>Save</Button>
                            <Button onClick={cancelEditTourSchedule}>Cancel</Button>
                        </>
                    ) : (
                        <>
                            <Button type="primary" onClick={() => editTourSchedule(record.id)}>Edit</Button>
                            <Button type="danger" onClick={() => deleteTourSchedule(record.id)}>Delete</Button>
                        </>
                    )}
                </Space>
            )
        }
    ];

    return (
        <div>
<NavApp/>
            <div className='row row-cols-1 row-cols-md-2 g-lg-2  mt-5 ms-5 me-5  '
                 style={{width: '1400px', margin:'0 -1px', marginBottom: '20px'}}>
                <Card title="Habitats Status">
                <HabitatStatusComponent />
                </Card>
                <Card title="Add New Tour Schedule">
                    <Input placeholder="Name" value={newTourScheduleData.name}
                           onChange={(e) => handleNewTourScheduleChange(e, 'name')}/>
                    <br/><br/>
                    <Input type="datetime-local" placeholder="Start Time" value={newTourScheduleData.start_time}
                           onChange={(e) => handleNewTourScheduleChange(e, 'start_time')}/>
                    <br/><br/>
                    <Input type="datetime-local" placeholder="End Time" value={newTourScheduleData.end_time}
                           onChange={(e) => handleNewTourScheduleChange(e, 'end_time')}/>
                    <br/><br/>
                    <TextArea maxCount={1000} showClear placeholder="Description"
                              value={newTourScheduleData.description}
                              onChange={(e) => handleNewTourScheduleChange(e, 'description')}/>
                    <br/><br/>
                    <Select
                        placeholder="Select Habitats"
                        multiple
                        value={newTourScheduleData.habitat}
                        onChange={(value) => setNewTourScheduleData({...newTourScheduleData, habitat: value})}
                        style={{width: '320px'}}
                    >
                        {habitats.map(habitat => (
                            <Select.Option key={habitat.id} value={habitat.id}>{habitat.name}</Select.Option>
                        ))}
                    </Select>

                    <Select
                        placeholder="Select Members"
                        multiple
                        value={newTourScheduleData.member}
                        onChange={(value) => setNewTourScheduleData({...newTourScheduleData, member: value})}
                        style={{width: '320px'}}
                    >
                        {members.map(member => (
                            <Select.Option key={member.id} value={member.id}>{member.full_name}</Select.Option>
                        ))}
                    </Select>
                    <br/><br/>
                    <Button type="primary" onClick={createTourSchedule}>Add Tour Schedule</Button>
                </Card>
            </div>
            <br />
            <Table dataSource={tourSchedules} columns={columns} />
        </div>
    );
};

export default TourScheduleComponent;
