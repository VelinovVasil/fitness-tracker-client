const API_URL = 'http://localhost:8080/user';

export const fetchAllUsers = async (token) => {
    try {
        const response = await fetch(API_URL + '/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; 
    }
}