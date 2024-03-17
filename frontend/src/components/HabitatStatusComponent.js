import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Badge} from "@douyinfe/semi-ui";
import { IconAvatar, IconCard ,IconSpin} from '@douyinfe/semi-icons-lab';
const HabitatStatusCard = ({ habitatStatus, habitatNames }) => {
    const formatTimeRemaining = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds =Math.floor(timeInSeconds) %60;
        return `${hours} hrs ${minutes} mins,${seconds} secs`;
    };

    return (
        <div>

            {habitatStatus.habitat_status.map((status, index) => (
                <div key={index}>
                    <h3>{habitatNames[status.habitat_id]}</h3>
                    <h5>Status:
                   <span><Badge dot type='primary' /> {status.status}</span> <IconSpin spin />
                    </h5>
                    <p>End Time Remaining: {formatTimeRemaining(status.end_time_remaining)}</p>
                </div>
            ))}
        </div>
    );
};

const HabitatStatusComponent = () => {
    const [habitatStatus, setHabitatStatus] = useState([]);
    const [habitatNames, setHabitatNames] = useState({});

    useEffect(() => {
        fetchHabitatStatus();
        fetchHabitatNames();
    }, []);

    const fetchHabitatStatus = () => {
        axios.get('http://127.0.0.1:8000/api/tour_schedule_habitat_status/')
            .then(response => {
                setHabitatStatus(response.data);
            })
            .catch(error => {
                console.error('Error fetching habitat status:', error);
            });
    };

    const fetchHabitatNames = () => {
        axios.get('http://127.0.0.1:8000/api/habitats/')
            .then(response => {
                const names = {};
                response.data.forEach(habitat => {
                    names[habitat.id] = habitat.name;
                });
                setHabitatNames(names);
            })
            .catch(error => {
                console.error('Error fetching habitat names:', error);
            });
    };

    return (
        <div>
            {habitatStatus.map((status, index) => (
                <HabitatStatusCard key={index} habitatStatus={status} habitatNames={habitatNames} />
            ))}
        </div>
    );
};

export default HabitatStatusComponent;

