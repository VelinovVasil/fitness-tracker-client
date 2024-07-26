import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLocationById } from '../services/locationService'; 
import { getWeather } from '../services/weatherService';
import MapComponent from './MapComponent';
import authenticationService from '../services/authenticationService';

export default function LocationDetails() {
    const { id } = useParams();
    const [location, setLocation] = useState(null);
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = authenticationService.getToken();

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
        <div className="location-details">
            <h1>{name}</h1>
            <div className="details">
                <div className="weather-info">
                    <h2>Weather Information</h2>
                    {weatherInfo ? (
                        <>
                            <p>Temperature: {weatherInfo.temp_c}°C</p>
                            <p>Feels Like: {weatherInfo.feelslike_c}°C</p>
                            <p>Condition: {weatherInfo.condition.text}</p>
                            <img src={weatherInfo.condition.icon} alt={weatherInfo.condition.text} />
                            <p>Wind: {weatherInfo.wind_kph} kph {weatherInfo.wind_dir}</p>
                        </>
                    ) : (
                        <p>No weather information available.</p>
                    )}
                </div>
                <div className="map">
                    <h2>Location Map</h2>
                    <MapComponent isInteractive={false} />
                </div>
            </div>
        </div>
    );
}
