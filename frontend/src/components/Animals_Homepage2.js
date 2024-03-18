import React, { useEffect, useState } from 'react';
import '../bootstrap-5.3.3-dist/css/bootstrap.min.css'
import AnimalApi from '../api/Animal';
import HabitatApi from '../api/Habitat';
import { Card, Space, Button, Typography,TextArea,Input ,Select,Text} from '@douyinfe/semi-ui';
import NavApp from "./Header_homepage";
const AnimalComponent = () => {
    const [animals, setAnimals] = useState([]);
    const [habitats, setHabitats] = useState([]);

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

    return (
        <div>

            <br/>
            <div className="row row-cols-1 row-cols-md-6 g-auto me-5 ms-5">
                {animals.map(animal => (

                    <div key={animal.id} className="col">

                        <Card
                            style={{marginBottom: '20px'}} // 调整卡片间距
                            hoverable // 可悬停效果
                            title='Animals'
                        >


                                <div className="card-body">
                                    {animal.image &&
                                        <img src={animal.image} alt={animal.name} className="card-img-top mb-2"
                                             style={{width: '220px', height: '150px'}}/>}
                                    <h5 className="card-title">Name: {animal.name}</h5>
                                    <p className="card-text"
                                       style={{width: '200px'}}>Description: {animal.description}</p>
                                    <p className="card-text">Habitat: {animal.habitat}</p>

                                    <Space>

                                    </Space>
                                </div>
                        </Card>
                    </div>
                ))}
            </div>
            </div>
    );
};

export default AnimalComponent;
