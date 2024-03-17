import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tour = () => {
  const [tours, setTours] = useState([]);
  const [newTourData, setNewTourData] = useState({ name: '', destinations: [] });
  const [habitats, setHabitats] = useState([]);

  useEffect(() => {
    fetchTours();
    fetchHabitats();
  }, []);

  const fetchTours = () => {
    axios.get('http://localhost:8000/TourApi/')
      .then(response => {
        console.log('Tours:', response.data);
        setTours(response.data);
      })
      .catch(error => {
        console.error('Error fetching tours:', error);
      });
  };

  const fetchHabitats = () => {
    axios.get('http://localhost:8000/HabitatApi/')
      .then(response => {
        console.log('Habitats:', response.data);
        setHabitats(response.data);
      })
      .catch(error => {
        console.error('Error fetching habitats:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewTourData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSelectChange = (e, index) => {
    const { value } = e.target;

    setNewTourData(prevData => {
      const updatedDestinations = [...prevData.destinations];
      updatedDestinations[index] = value;
      return { ...prevData, destinations: updatedDestinations };
    });
  };

  const createTour = () => {
    axios.post('http://localhost:8000/TourApi/', newTourData)
      .then(response => {
        console.log('New Tour created:', response.data);
        setTours(prevTours => [...prevTours, response.data]); // 将新创建的 tour 添加到现有的 tours 列表中
        setNewTourData({ name: '', destinations: [] }); // 重置表单数据
      })
      .catch(error => {
        console.error('Error creating tour:', error);
      });
  };

  return (
    <div>
      <h1>Tours</h1>
      <ul>
        {tours.map(tour => (
          <li key={tour.id}>
            Name: {tour.name}<br />
            Destinations:
            <ul>
              {Array.from({ length: 10 }, (_, index) => {
                const destinationField = `destination${index + 1}`;
                const destinationId = tour[destinationField];
                const destination = habitats.find(dest => dest.id === destinationId);
                return destination && (
                  <li key={destination.id}>{destination.name}</li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
      <h2>Create New Tour</h2>
      <input type="text" name="name" value={newTourData.name} onChange={handleChange} placeholder="Tour Name" />
      {[...Array(10)].map((_, index) => (
        <select key={index} value={newTourData.destinations[index] || ''} onChange={(e) => handleSelectChange(e, index)}>
          <option value="">Select Habitat {index + 1}</option>
          {habitats && habitats.map(habitat => (
            <option key={habitat.id} value={habitat.name}>{habitat.name}</option>
          ))}
        </select>
      ))}
      <button onClick={createTour}>Create Tour</button>
    </div>
  );
}

export default Tour;
