import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLocationById, deleteLocation } from '../services/locationService'; 
import { getWeather } from '../services/weatherService';
import MapComponent from './MapComponent';
import authenticationService from '../services/authenticationService';

export default function LocationDetails() {
    const { id } = useParams();
    const [location, setLocation] = useState(null);
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = authenticationService.getToken();
    const navigate = useNavigate();

    function handleDeleteLocation() {
        deleteLocation(id, token).then(() => navigate('/dashboard'))
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch location details
                const locationData = await getLocationById(id, token);
                setLocation(locationData);

                // Fetch weather info based on location coordinates
                const weatherData = await getWeather(`${locationData.latitude},${locationData.longitude}`);
                setWeather(weatherData);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id, token]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!location) {
        return <div>No location data found.</div>;
    }

    const { name, latitude, longitude } = location;
    const weatherInfo = weather ? weather.current : null;

    return (
        <div className="location-details-container">
            <h1 className="location-details-title">{name}</h1>
            <div className="location-details-content">
                <div className="location-weather-info">
                    <h2>Weather Information</h2>
                    {weatherInfo ? (
                        <>
                            <p className="location-weather-item">
                                <img className="location-weather-icon" src={weatherInfo.condition.icon} alt={weatherInfo.condition.text} />
                                <strong>Condition:</strong> {weatherInfo.condition.text}
                            </p>
                            <p className="location-weather-item"><strong>Temperature:</strong> {weatherInfo.temp_c}°C</p>
                            <p className="location-weather-item"><strong>Feels Like:</strong> {weatherInfo.feelslike_c}°C</p>
                            <p className="location-weather-item"><strong>Wind:</strong> {weatherInfo.wind_kph} kph {weatherInfo.wind_dir}</p>
                            <button onClick={() => handleDeleteLocation()} className='btn-delete-location'>Delete</button>
                        </>
                    ) : (
                        <p>No weather information available.</p>
                    )}
                </div>
                <div className="location-map">
                    <h2>Location Map</h2>
                    <MapComponent isInteractive={false} />
                </div>
            </div>
        </div>
    );
}
