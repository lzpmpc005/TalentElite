import React, { useEffect, useState } from 'react';
import axios from "axios";
import ActivityApi from "../api/Activity";
import MemberApi from "../api/MemberApi";
import HabitatApi from "../api/Habitat";
import AnimalApi from "../api/Animal";
import AP from "../api/AP";

function ActivityParticipants() {
    const [participants, setParticipants] = useState([]);
    const [activityOptions, setActivityOptions] = useState([]);
    const [memberOptions, setMemberOptions] = useState([]);
    const [habitatOptions, setHabitatOptions] = useState([]);
    const [animalOptions, setAnimalOptions] = useState([]);
    const [activity, setActivity] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [selectedHabitats, setSelectedHabitats] = useState([]);
    const [selectedAnimals, setSelectedAnimals] = useState([]);

    useEffect(() => {
        fetchParticipants();
        fetchOptions();
    }, []);

    const fetchParticipants = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/activityparticipants/');
            setParticipants(response.data);
        } catch (error) {
            console.error('Error fetching participants:', error);
        }
    };

    const fetchOptions = async () => {
        try {
            const [activityRes, memberRes, habitatRes, animalRes] = await Promise.all([
                axios.get('http://localhost:8000/api/activities/'),
                axios.get('http://localhost:8000/api/members/'),
                axios.get('http://localhost:8000/api/habitats/'),
                axios.get('http://localhost:8000/api/animals/')
            ]);
            setActivityOptions(activityRes.data);
            setMemberOptions(memberRes.data);
            setHabitatOptions(habitatRes.data);
            setAnimalOptions(animalRes.data);
        } catch (error) {
            console.error('Error fetching options:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newParticipant = {
            activity: activity,
            member: selectedMembers,
            habitat: selectedHabitats,
            animal: selectedAnimals
        };
        try {
            const response = await axios.post('http://localhost:8000/api/activityparticipants/', newParticipant);
            setParticipants([...participants, response.data]);
            setActivity('');
            setSelectedMembers([]);
            setSelectedHabitats([]);
            setSelectedAnimals([]);
        } catch (error) {
            console.error('Error adding participant:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/activityparticipants/${id}/`);
            setParticipants(participants.filter(participant => participant.id !== id));
        } catch (error) {
            console.error('Error deleting participant:', error);
        }
    };

    return (
        <div>
            <h2>Activity Participants</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="activity">Activity:</label>
                <select id="activity" name="activity" value={activity} onChange={(e) => setActivity(e.target.value)}>
                    {activityOptions.map(activity => (
                        <option key={activity.id} value={activity.id}>{activity.name}</option>
                    ))}
                </select><br />

                <label htmlFor="members">Members:</label>
                <select id="members" name="members" multiple value={selectedMembers} onChange={(e) => setSelectedMembers(Array.from(e.target.selectedOptions, option => option.value))}>
                    {memberOptions.map(member => (
                        <option key={member.id} value={member.id}>{member.full_name}</option>
                    ))}
                </select><br />

                <label htmlFor="habitats">Habitats:</label>
                <select id="habitats" name="habitats" multiple value={selectedHabitats} onChange={(e) => setSelectedHabitats(Array.from(e.target.selectedOptions, option => option.value))}>
                    {habitatOptions.map(habitat => (
                        <option key={habitat.id} value={habitat.id}>{habitat.name}</option>
                    ))}
                </select><br />

                <label htmlFor="animals">Animals:</label>
                <select id="animals" name="animals" multiple value={selectedAnimals} onChange={(e) => setSelectedAnimals(Array.from(e.target.selectedOptions, option => option.value))}>
                    {animalOptions.map(animal => (
                        <option key={animal.id} value={animal.id}>{animal.name}</option>
                    ))}
                </select><br />

                <button type="submit">Add Participant</button>
            </form>

            <div>
                <h3>Participants List</h3>
                {participants.map(participant => (
                    <div key={participant.id}>
                        <p>Activity: {participant.activity.name}</p>
                        <p>Members: {participant.member.map(member => member.full_name).join(', ')}</p>
                        <p>Habitats: {participant.habitat.map(habitat => habitat.name).join(', ')}</p>
                        <p>Animals: {participant.animal.map(animal => animal.name).join(', ')}</p>
                        <button onClick={() => handleDelete(participant.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ActivityParticipants;
