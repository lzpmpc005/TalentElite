import React, { useEffect, useState } from 'react';
import ZookeeperApi from '../api/Zookeeper';
import {Card, Space, Button, Typography,TextArea,Input ,Select,Text} from "@douyinfe/semi-ui";

const ZookeeperComponent = () => {
    const [zookeepers, setZookeepers] = useState([]);
    const [newZookeeperData, setNewZookeeperData] = useState({ name: '', responsibility: '', qualification: '' ,image:''});
    const [editZookeeperId, setEditZookeeperId] = useState(null);
    const [editZookeeperData, setEditZookeeperData] = useState({ name: '', responsibility: '', qualification: '',image:'' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchZookeepers();
    }, []);

    const fetchZookeepers = () => {
        ZookeeperApi.getAllZookeepers()
            .then(response => {
                setZookeepers(response.data);
            })
            .catch(error => {
                console.error('Error fetching zookeepers:', error);
            });
    };

    const createZookeeper = () => {
        ZookeeperApi.createZookeeper(newZookeeperData)
            .then(response => {
                fetchZookeepers();
                setNewZookeeperData({ name: '', responsibility: '', qualification: '',image:'' });
            })
            .catch(error => {
                console.error('Error creating zookeeper:', error);
            });
    };

    const deleteZookeeper = (zookeeperId) => {
        ZookeeperApi.deleteZookeeper(zookeeperId)
            .then(response => {
                fetchZookeepers();
            })
            .catch(error => {
                console.error('Error deleting zookeeper:', error);
            });
    };

    const editZookeeper = (zookeeperId, zookeeperData) => {
        setEditZookeeperId(zookeeperId);
        setEditZookeeperData(zookeeperData);
        setIsEditing(true);
    };

    const saveEditZookeeper = () => {
        ZookeeperApi.updateZookeeper(editZookeeperId, editZookeeperData)
            .then(response => {
                fetchZookeepers();
                setEditZookeeperId(null);
                setEditZookeeperData({ name: '', responsibility: '', qualification: '' ,image:''});
                setIsEditing(false);
            })
            .catch(error => {
                console.error('Error updating zookeeper:', error);
            });
    };

    const cancelEditZookeeper = () => {
        setEditZookeeperId(null);
        setEditZookeeperData({ name: '', responsibility: '', qualification: '',image:'' });
        setIsEditing(false);
    };

    return (
        <div>
            <div className='mt-5 ms-5'>
                <Card
                    style={{width: '800px', marginBottom: '20px'}} // 调整卡片间距
                    hoverable // 可悬停效果
                    title='Add Animal'
                >

            <Input
                type="text"
                placeholder="Name"
                value={newZookeeperData.name}
                onChange={(e) => setNewZookeeperData({...newZookeeperData, name: e})}
            />
            <br/><br/>
            <TextArea
                maxCount={100}
                showClear
                type="text"
                placeholder="Responsibility"
                value={newZookeeperData.responsibility}
                onChange={(e) => setNewZookeeperData({...newZookeeperData, responsibility: e})}
            />
            <br/><br/>
            <Input
                type="text"
                placeholder="Qualification"
                value={newZookeeperData.qualification}
                onChange={(e) => setNewZookeeperData({...newZookeeperData, qualification: e})}
            />
            <br/><br/>
            <Input
                type="text"
                placeholder="Image URL"
                value={newZookeeperData.image}
                onChange={(e) => setNewZookeeperData({...newZookeeperData, image: e})}
            />
            <br/><br/>
            <Button onClick={createZookeeper}>Add</Button>
            <br/><br/>
                </Card>
            </div>

            <div className='row row-cols-auto row-cols-md-5 g-auto me-5 ms-5 gap-5'>
                {zookeepers.map(zookeeper => (
                    <div key={zookeeper.id} className='col'>
                        <Card
                            style={{marginBottom: '20px'}} // 调整卡片间距
                            hoverable // 可悬停效果
                            title='Zoo_Keepers'
                        >
                            {isEditing && editZookeeperId === zookeeper.id ? (
                                <div className='card-body'>
                                    <Input
                                        type="text"
                                        value={editZookeeperData.name}
                                        onChange={(e) => setEditZookeeperData({
                                            ...editZookeeperData,
                                            name: e
                                        })}
                                        className="form-control mb-2"
                                    />
                                    <TextArea
                                        maxCount={100}
                                        showClear
                                        type="text"
                                        value={editZookeeperData.responsibility}
                                        onChange={(e) => setEditZookeeperData({
                                            ...editZookeeperData,
                                            responsibility: e
                                        })}
                                        className="form-control mb-2"
                                    />
                                    <Input
                                        type="text"
                                        value={editZookeeperData.qualification}
                                        onChange={(e) => setEditZookeeperData({
                                            ...editZookeeperData,
                                            qualification: e
                                        })}
                                        className="form-control mb-2"
                                    />
                                    <Input
                                        type="text"
                                        value={editZookeeperData.image}
                                        onChange={(e) => setNewZookeeperData({...editZookeeperData, image: e})}
                                        className="form-control mb-2"
                                    />
                                    <Button onClick={saveEditZookeeper}>Save</Button>
                                    <Button onClick={cancelEditZookeeper}>Cancel</Button>
                                </div>
                            ) : (
                                <div className='card-body'>
                                    {zookeeper.image &&
                                        <img src={zookeeper.image} alt={zookeeper.name} className="card-img-top mb-2"
                                             style={{width: '150px', height: '220px'}}/>}
                                    <h5 className='card-title'>{zookeeper.name}</h5>
                                    <p className='card-text'>{zookeeper.responsibility}</p>
                                    <p className='card-text'>{zookeeper.qualification}</p>
                                    <Space>
                                        <Button type='danger'
                                                onClick={() => deleteZookeeper(zookeeper.id)}>Delete</Button>
                                        <Button type='primary'
                                                onClick={() => editZookeeper(zookeeper.id, zookeeper)}>Edit</Button>
                                    </Space>
                                </div>
                            )}
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ZookeeperComponent;
