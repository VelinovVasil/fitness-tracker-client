export const getWeather = async (query) => {
    const response = await fetch(`http://localhost:8080/weather/current?q=${query}`);
    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }
    return response.json();
};