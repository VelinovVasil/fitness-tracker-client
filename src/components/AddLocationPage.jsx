import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MapComponent from './MapComponent';
import LocationForm from './LocationForm';
import authenticationService from '../services/authenticationService';
import { jwtDecode } from 'jwt-decode';
import { addLocation } from '../services/locationService';

export default function AddLocationPage() {
  const [coordinates, setCoordinates] = useState(null);
  const navigate = useNavigate();

  const handleFormSubmit = async (name) => {
    if (!coordinates) {
      alert('Please select a location on the map');
      return;
    }

    const token = authenticationService.getToken();
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    const locationData = {
      name,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      userId,
    };

    try {
      await addLocation(locationData, token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding location:', error);
      alert('There was an error adding the location. Please try again.');
    }
  };

  return (
    <div>
      <h1>Create Location</h1>
      <MapComponent setCoordinates={setCoordinates} isInteractive={true} />
      <LocationForm onSubmit={handleFormSubmit} />
    </div>
  );
}
