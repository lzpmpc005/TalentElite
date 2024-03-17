import React, { useEffect, useState } from 'react';
import '../bootstrap-5.3.3-dist/css/bootstrap.min.css'
import AnimalApi from '../api/Animal';
import HabitatApi from '../api/Habitat';
import { Card, Space, Button, Typography,TextArea,Input ,Select,Text} from '@douyinfe/semi-ui';
const AnimalComponent = () => {
    const [animals, setAnimals] = useState([]);
    const [habitats, setHabitats] = useState([]);
    const [newAnimalData, setNewAnimalData] = useState({ name: '', description: '', habitat: '', image: '' });
    const [editAnimalId, setEditAnimalId] = useState(null);
    const [editAnimalData, setEditAnimalData] = useState({ name: '', description: '', habitat: '', image: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchAnimals();
        fetchHabitats();
    }, []);

    const fetchAnimals = () => {
        AnimalApi.getAllAnimals()
            .then(response => {
                setAnimals(response.data);
            })
            .catch(error => {
                console.error('Error fetching animals:', error);
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

    const createAnimal = () => {
        AnimalApi.createAnimal(newAnimalData)
            .then(response => {
                fetchAnimals();
                setNewAnimalData({ name: '', description: '', habitat: '', image: '' });
            })
            .catch(error => {
                console.error('Error creating animal:', error);
            });
    };
    const { Text } = Typography;
    const deleteAnimal = (animalId) => {
        AnimalApi.deleteAnimal(animalId)
            .then(response => {
                fetchAnimals();
            })
            .catch(error => {
                console.error('Error deleting animal:', error);
            });
    };

    const editAnimal = (animalId, animalData) => {
        setEditAnimalId(animalId);
        setEditAnimalData(animalData);
        setIsEditing(true);
    };

    const saveEditAnimal = () => {
        AnimalApi.updateAnimal(editAnimalId, editAnimalData)
            .then(response => {
                fetchAnimals();
                setEditAnimalId(null);
                setEditAnimalData({ name: '', description: '', habitat: '', image: '' });
                setIsEditing(false);
            })
            .catch(error => {
                console.error('Error updating animal:', error);
            });
    };

    const cancelEditAnimal = () => {
        setEditAnimalId(null);
        setEditAnimalData({ name: '', description: '', habitat: '', image: '' });
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
                        type='text'
                        placeholder="Name"
                        size='large'
                        value={newAnimalData.name}
                        onChange={(e) => setNewAnimalData({...newAnimalData, name: e})}
                    />
                    <br/><br/>
                    <TextArea
                        type="text"
                        placeholder="Description"
                        maxCount={1000}
                        showClear
                        value={newAnimalData.description}
                        onChange={(e) => setNewAnimalData({...newAnimalData, description: e})}
                        className="input-description" // 添加这行，应用描述输入框的样式
                    />
                    <br/><br/>
                    <Select
                        placeholder="Select Habitat"
                        size='large'
                        value={newAnimalData.habitat}
                        onChange={(value) => setNewAnimalData({...newAnimalData, habitat: value})}
                        style={{width: 120}}
                    >

                        {habitats.map(habitat => (
                            <Select.Option key={habitat.id} value={habitat.id}>{habitat.name}</Select.Option>
                        ))}
                    </Select>
                    <br/><br/>
                    <Input
                        type="text"
                        placeholder="Image URL"
                        size='large'
                        value={newAnimalData.image}
                        onChange={(e) => setNewAnimalData({...newAnimalData, image: e})}
                    />
                    <br/><br/>

                    <Button type='primary' onClick={createAnimal}>Add</Button>

                    <br/><br/>
                </Card>
            </div>

            <br/><br/>


            <div className="row row-cols-1 row-cols-md-6 g-auto me-5 ms-5">
                {animals.map(animal => (

                    <div key={animal.id} className="col">

                        <Card
                            style={{marginBottom: '20px'}} // 调整卡片间距
                            hoverable // 可悬停效果
                            title='Animals'
                        >
                            {isEditing && editAnimalId === animal.id ? (
                                <div className="card-body">
                                    <input
                                        type="text"
                                        value={editAnimalData.name}
                                        onChange={(e) => setEditAnimalData({...editAnimalData, name: e.target.value})}
                                        className="form-control mb-2"
                                    />
                                    <input
                                        type="text"
                                        value={editAnimalData.description}
                                        onChange={(e) => setEditAnimalData({
                                            ...editAnimalData,
                                            description: e.target.value
                                        })}
                                        className="form-control mb-2"
                                    />
                                    <select
                                        value={editAnimalData.habitat}
                                        onChange={(e) => setEditAnimalData({
                                            ...editAnimalData,
                                            habitat: e.target.value
                                        })}
                                        className="form-select mb-2"
                                    >
                                        <option value="">Select Habitat</option>
                                        {habitats.map(habitat => (
                                            <option key={habitat.id} value={habitat.id}>{habitat.name}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="text"
                                        value={editAnimalData.image}
                                        onChange={(e) => setEditAnimalData({...editAnimalData, image: e.target.value})}
                                        className="form-control mb-2"
                                    />
                                    <button onClick={saveEditAnimal} className="btn btn-primary me-2">Save</button>
                                    <button onClick={cancelEditAnimal} className="btn btn-secondary">Cancel</button>
                                </div>
                            ) : (
                                <div className="card-body">
                                    {animal.image &&
                                        <img src={animal.image} alt={animal.name} className="card-img-top mb-2"
                                             style={{width: '220px', height: '150px'}}/>}
                                    <h5 className="card-title">Name: {animal.name}</h5>
                                    <p className="card-text"
                                       style={{width: '200px'}}>Description: {animal.description}</p>
                                    <p className="card-text">Habitat: {animal.habitat}</p>

                                    <Space>
                                        <Button type="danger" onClick={() => deleteAnimal(animal.id)}>Delete</Button>
                                        <Button type="primary"
                                                onClick={() => editAnimal(animal.id, animal)}>Edit</Button>
                                    </Space>
                                </div>
                            )}
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AnimalComponent;
