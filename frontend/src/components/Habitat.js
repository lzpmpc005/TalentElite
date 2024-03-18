import React, { useEffect, useState } from 'react';
import HabitatApi from '../api/Habitat';
import { Card, Space, Button, Typography,TextArea,Input ,Select,Text} from '@douyinfe/semi-ui';
import NavApp from "../Header";
const HabitatComponent = () => {
    const [habitats, setHabitats] = useState([]);
    const [newHabitatData, setNewHabitatData] = useState({ name: '', description: '', image: '' });
    const [editHabitatId, setEditHabitatId] = useState(null);
    const [editHabitatData, setEditHabitatData] = useState({ name: '', description: '', image: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchHabitats();
    }, []);

    const fetchHabitats = () => {
        HabitatApi.getAllHabitats()
            .then(response => {
                setHabitats(response.data);
            })
            .catch(error => {
                console.error('Error fetching habitats:', error);
            });
    };

    const createHabitat = () => {
        HabitatApi.createHabitat(newHabitatData)
            .then(response => {
                fetchHabitats();
                setNewHabitatData({ name: '', description: '', image: '' });
            })
            .catch(error => {
                console.error('Error creating habitat:', error);
            });
    };

    const deleteHabitat = (habitatId) => {
        HabitatApi.deleteHabitat(habitatId)
            .then(response => {
                fetchHabitats();
            })
            .catch(error => {
                console.error('Error deleting habitat:', error);
            });
    };

    const editHabitat = (habitatId, habitatData) => {
        setEditHabitatId(habitatId);
        setEditHabitatData(habitatData);
        setIsEditing(true);
    };

    const saveEditHabitat = () => {
        HabitatApi.updateHabitat(editHabitatId, editHabitatData)
            .then(response => {
                fetchHabitats();
                setEditHabitatId(null);
                setEditHabitatData({ name: '', description: '', image: '' });
                setIsEditing(false);
            })
            .catch(error => {
                console.error('Error updating habitat:', error);
            });
    };

    const cancelEditHabitat = () => {
        setEditHabitatId(null);
        setEditHabitatData({ name: '', description: '', image: '' });
        setIsEditing(false);
    };

    return (
        <div>
        <NavApp/>
            <div className='mt-5 ms-5'>
                <Card
                    style={{width: '800px', marginBottom: '20px'}} // 调整卡片间距
                    hoverable // 可悬停效果
                    title='Add Habitats'
                >
            <Input
                type="text"
                placeholder="Name"
                value={newHabitatData.name}
                onChange={(e) => setNewHabitatData({...newHabitatData, name: e})}
            />
            <br/><br/>
            <TextArea
                maxCount={1000}
                showClear
                type="text"
                placeholder="Description"
                value={newHabitatData.description}
                onChange={(e) => setNewHabitatData({...newHabitatData, description: e})}
            />
            <br/><br/>
            <Input
                type="text"
                placeholder="Image URL"
                value={newHabitatData.image}
                onChange={(e) => setNewHabitatData({...newHabitatData, image: e})}
            />
            <br/><br/>
            <Button onClick={createHabitat}>Add</Button>
            <br/><br/>
                </Card>
            </div>
            <br/><br/>
            <div className='row row-cols-auto row-cols-md-5 g-auto me-5 ms-5 gap-5'>
                {habitats.map(habitat => (

                    <Card

                        key={habitat.id}
                        title={habitat.name}
                        style={{width: '300px', marginBottom: '20px'}}
                        cover={<img src={habitat.image} alt={habitat.name} style={{height: '200px'}}/>}
                        actions={[

                            <Button key="edit" onClick={() => editHabitat(habitat.id)}>Edit</Button>,
                            <Button type="danger" onClick={() => deleteHabitat(habitat.id)}>Delete</Button>
                        ]}
                    >

                        {habitat.description}
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default HabitatComponent;
