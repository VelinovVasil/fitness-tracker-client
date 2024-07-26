const API_URL = 'http://localhost:8080/location';

export const addLocation = async (dto, token) => {
    try {
        const response = await fetch(`${API_URL}/add-location`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dto)
        });
        return response;
    } catch (error) {
        console.error('Error adding location:', error);
        throw error;
    }
};

export const deleteLocation = async (id, token) => {
    try {
        await fetch(`${API_URL}/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('Error deleting location:', error);
        throw error;
    }
};

export const fetchAllLocationsByUserId = async (userId, token) => {
    try {
        const response = await fetch(`${API_URL}/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching locations by user ID:', error);
        throw error;
    }
};

export const getAllLocations = async (token) => {
    try {
        const response = await fetch(`${API_URL}/all`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching all locations:', error);
        throw error;
    }
};

export const getLocationById = async (id, token) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching location by ID:', error);
        throw error;
    }
};
