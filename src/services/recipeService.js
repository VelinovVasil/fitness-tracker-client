const API_URL = 'http://localhost:8080/recipe';

export const createRecipe = async (recipe, token) => {

    return fetch(API_URL + '/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(recipe)
            }).then(res => res.json())
            .then(data => console.log(data))
            .catch(e => console.log(e));

}

export const fetchAllRecipesByUserId = async (userId, token) => {
    try {
        const response = await fetch(API_URL + '/get/' + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch recipes');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error; 
    }
};

export const fetchRecipeById = async (recipeId, token) => {
    try {
        const response = await fetch(API_URL + '/'+ recipeId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch recipe');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching recipe:', error);
        throw error; 
    }

}