import React, { useState, useEffect } from 'react';
import ActivityApi from '../api/Activity';
import AnimalApi from '../api/Animal';
import MemberApi from '../api/MemberApi';
import HabitatApi from '../api/Habitat';
import { Card,Table, Button, Select, Input ,TextArea} from '@douyinfe/semi-ui';
import NavApp from "./Header_homepage";
const ActivityComponent = () => {
    const [activities, setActivities] = useState([]);
    const [habitats, setHabitats] = useState([]);
    const [animals, setAnimals] = useState([]);
    const [members, setMembers] = useState([]);


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


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',

        },
        {
            title: 'Description',
            dataIndex: 'description',

        },
        {
            title: 'Start Time',
            dataIndex: 'start_time',

        },
        {
            title: 'End Time',
            dataIndex: 'end_time',

        },
        {
            title: 'Habitat',
            dataIndex: 'habitat',
            render: (text, record) => (



                    habitats.filter(habitat => record.habitat.includes(habitat.id)).map(habitat => habitat.name).join(', ')

            )
        },
        {
            title: 'Animal',
            dataIndex: 'animal',
            render: (text, record) => (
                    animals.filter(animal => record.animal.includes(animal.id)).map(animal => animal.name).join(', ')
                )
        },

    ];

    return (
        <div>
<NavApp />

            <Table title='Activities and Informations' columns={columns} dataSource={activities}/>
        </div>
    );
};

export default ActivityComponent;