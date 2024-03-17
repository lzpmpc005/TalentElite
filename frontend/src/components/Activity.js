import React, { useState, useEffect } from 'react';
import ActivityApi from '../api/Activity';
import AnimalApi from '../api/Animal';
import MemberApi from '../api/MemberApi';
import HabitatApi from '../api/Habitat';
import { Card,Table, Button, Select, Input ,TextArea} from '@douyinfe/semi-ui';

const ActivityComponent = () => {
    const [activities, setActivities] = useState([]);
    const [newActivity, setNewActivity] = useState({
        name: '',
        description: '',
        start_time: '',
        end_time: '',
        habitat: '',
        animal: '',
        member: '',
    });
    const [habitats, setHabitats] = useState([]);
    const [animals, setAnimals] = useState([]);
    const [members, setMembers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editActivityId, setEditActivityId] = useState(null);
    const [editActivityData, setEditActivityData] = useState({
        name: '',
        description: '',
        start_time: '',
        end_time: '',
        habitat: '',
        animal: '',
        member: '',
    });

    useEffect(() => {
        fetchActivities();
        fetchHabitats();
        fetchAnimals();
        fetchMembers();
    }, []);

    const fetchActivities = () => {
        ActivityApi.getAllActivities()
            .then(response => {
                setActivities(response.data);
            })
            .catch(error => {
                console.error('Error fetching activities:', error);
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

    const fetchAnimals = () => {
        AnimalApi.getAllAnimals()
            .then(response => {
                setAnimals(response.data);
            })
            .catch(error => {
                console.error('Error fetching animals:', error);
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

    const createActivity = () => {
        ActivityApi.createActivity(newActivity)
            .then(response => {
                fetchActivities();
                setNewActivity({
                    name: '',
                    description: '',
                    start_time: '',
                    end_time: '',
                    habitat: '',
                    animal: '',
                    member: '',
                });
            })
            .catch(error => {
                console.error('Error creating activity:', error);
            });
    };

    const deleteActivity = (activityId) => {
        ActivityApi.deleteActivity(activityId)
            .then(response => {
                fetchActivities();
            })
            .catch(error => {
                console.error('Error deleting activity:', error);
            });
    };

    const editActivity = (activity) => {
        setEditActivityId(activity.id);
        setEditActivityData(activity);
        setIsEditing(true);
    };

    const saveEditActivity = () => {
        ActivityApi.updateActivity(editActivityId, editActivityData)
            .then(response => {
                fetchActivities();
                setEditActivityId(null);
                setEditActivityData({
                    name: '',
                    description: '',
                    start_time: '',
                    end_time: '',
                    habitat: '',
                    animal: '',
                    member: '',
                });
                setIsEditing(false);
            })
            .catch(error => {
                console.error('Error updating activity:', error);
            });
    };

    const cancelEditActivity = () => {
        setEditActivityId(null);
        setEditActivityData({
            name: '',
            description: '',
            start_time: '',
            end_time: '',
            habitat: '',
            animal: '',
            member: '',
        });
        setIsEditing(false);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => (
                isEditing && editActivityId === record.id ? (
                    <Input value={editActivityData.name} onChange={(e) => setEditActivityData({ ...editActivityData, name: e.target.value })} />
                ) : (
                    text
                )
            )
        },
        {
            title: 'Description',
            dataIndex: 'description',
            render: (text, record) => (
                isEditing && editActivityId === record.id ? (
                    <Input value={editActivityData.description} onChange={(e) => setEditActivityData({ ...editActivityData, description: e.target.value })} />
                ) : (
                    text
                )
            )
        },
        {
            title: 'Start Time',
            dataIndex: 'start_time',
            render: (text, record) => (
                isEditing && editActivityId === record.id ? (
                    <Input value={editActivityData.start_time} onChange={(e) => setEditActivityData({ ...editActivityData, start_time: e.target.value })} />
                ) : (
                    text
                )
            )
        },
        {
            title: 'End Time',
            dataIndex: 'end_time',
            render: (text, record) => (
                isEditing && editActivityId === record.id ? (
                    <Input value={editActivityData.end_time} onChange={(e) => setEditActivityData({ ...editActivityData, end_time: e.target.value })} />
                ) : (
                    text
                )
            )
        },
        {
            title: 'Habitat',
            dataIndex: 'habitat',
            render: (text, record) => (
                isEditing && editActivityId === record.id ? (
                    <Select multiple value={editActivityData.habitat} onChange={(value) => setEditActivityData({ ...editActivityData, habitat: value })}>
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
            title: 'Animal',
            dataIndex: 'animal',
            render: (text, record) => (
                isEditing && editActivityId === record.id ? (
                    <Select multiple value={editActivityData.animal} onChange={(value) => setEditActivityData({ ...editActivityData, animal: value })}>
                        {animals.map(animal => (
                            <Select.Option key={animal.id} value={animal.id}>{animal.name}</Select.Option>
                        ))}
                    </Select>
                ) : (
                    animals.filter(animal => record.animal.includes(animal.id)).map(animal => animal.name).join(', ')
                )
            )
        },
        {
            title: 'Member',
            dataIndex: 'member',
            render: (text, record) => (
                isEditing && editActivityId === record.id ? (
                    <Select
                        multiple
                        value={editActivityData.member}
                        onChange={(value) => setEditActivityData({ ...editActivityData, member: value })}
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
            dataIndex: 'actions',
            render: (text, record) => (
                isEditing && editActivityId === record.id ? (
                    <>
                        <Button type="primary" onClick={saveEditActivity}>Save</Button>
                        <Button onClick={cancelEditActivity}>Cancel</Button>
                    </>
                ) : (
                    <>
                        <Button type="danger" onClick={() => deleteActivity(record.id)}>Delete</Button>
                        <Button type="primary" onClick={() => editActivity(record)}>Edit</Button>
                    </>
                )
            )
        },
    ];

    return (
        <div>
            <div className='mt-5 ms-5'>
                <Card
                    style={{width: '800px', marginBottom: '20px'}} // 调整卡片间距
                    hoverable // 可悬停效果
                    title='Add Activities and select informations'
                >
            <Input
                type="text"
                placeholder="Name"
                value={newActivity.name}
                onChange={(e) => setNewActivity({...newActivity, name: e})}
            />
            <br></br>
            <br></br>
            <TextArea
                maxCount={1000}
                showClear
                type="text"
                placeholder="Description"
                value={newActivity.description}
                onChange={(e) => setNewActivity({...newActivity, description: e})}
            />

            <br></br>
            <br></br>
            <Input
                type="datetime-local"
                placeholder="Start Time"
                value={newActivity.start_time}
                onChange={(e) => setNewActivity({...newActivity, start_time: e})}
            />
            <br></br>
            <br></br>
            <Input
                type="datetime-local"
                placeholder="End Time"
                value={newActivity.end_time}
                onChange={(e) => setNewActivity({...newActivity, end_time: e})}
            />
            <br></br>
            <br></br>
            <Select
                placeholder="Select Habitats"
                multiple
                value={newActivity.habitat}
                onChange={(value) => setNewActivity({...newActivity, habitat: value})}
                style={{ width: '320px' }}
            >
                {habitats.map(habitat => (
                    <Select.Option key={habitat.id} value={habitat.id}>{habitat.name}</Select.Option>
                ))}
            </Select>
            <br />
            <br />
            <Select
                placeholder="Select Animals"
                multiple
                value={newActivity.animal}
                onChange={(value) => setNewActivity({...newActivity, animal: value})}
                style={{ width: '320px' }}
            >
                {animals.map(animal => (
                    <Select.Option key={animal.id} value={animal.id}>{animal.name}</Select.Option>
                ))}
            </Select>
            <br />
            <br />
            <Select
                placeholder="Select Members"
                multiple
                value={newActivity.member}
                onChange={(value) => setNewActivity({...newActivity, member: value})}
                style={{ width: '320px' }}
            >
                {members.map(member => (
                    <Select.Option key={member.id} value={member.id}>{member.full_name}</Select.Option>
                ))}
            </Select>
            <br></br>
            <br></br>

            <Button onClick={createActivity}>Add</Button>
                </Card>
            </div>


            <Table title='Activities and Informations' columns={columns} dataSource={activities}/>
        </div>
    );
};

export default ActivityComponent;
