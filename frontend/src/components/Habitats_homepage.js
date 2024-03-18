import React, { useEffect, useState } from 'react';
import HabitatApi from '../api/Habitat';
import { Card, Space, Button, Typography,TextArea,Input ,Select,Text} from '@douyinfe/semi-ui';
import NavApp from "./Header_homepage";
const HabitatComponent = () => {
    const [habitats, setHabitats] = useState([]);


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


    return (
        <div>
        <NavApp />
            <br/><br/>
            <div className='row row-cols-auto row-cols-md-5 g-auto me-5 ms-5 gap-5'>
                {habitats.map(habitat => (

                    <Card

                        key={habitat.id}
                        title={habitat.name}
                        style={{width: '300px', marginBottom: '20px'}}
                        cover={<img src={habitat.image} alt={habitat.name} style={{height: '200px'}}/>}
                        actions={[

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