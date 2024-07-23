

export const addExercise = async (dto, token) => {

    try {
        const response = await fetch('http://localhost:8080/exercise/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dto)
        });
        return response;
    } catch (error) {
        console.error('Error creating an exercise:', error);
    }

}

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

export const fetchExerciseById = async (id, token) => {

    
    try {
        const response = await fetch('http://localhost:8080/exercise/' + id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching exercise:', error);
    }

}