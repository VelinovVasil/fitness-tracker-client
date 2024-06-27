const API_URL = 'http://localhost:8080/auth';

const login = async (username, password) => {
  const response = await fetch(`${API_URL}/authenticate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Failed to login');
  }

  const data = await response.json();
  localStorage.setItem('token', data.token);
};

const logout = () => {
  localStorage.removeItem('token');
};

const getToken = () => {
  return localStorage.getItem('token');
};

const parseToken = (token) => {
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload;
};

const authService = {
  login,
  logout,
  getToken,
  parseToken,
};

export default authService;
