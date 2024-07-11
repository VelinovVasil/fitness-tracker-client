

export const fetchExercises = async (token) => {

            try {
                const response = await fetch('http://localhost:8080/exercise/', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                return await response.json();
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }

}