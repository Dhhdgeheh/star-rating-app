import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null); // contains name, email, role, etc.
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Auto-login on refresh
  useEffect(() => {
    if (token) {
      axios
        .get('/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => {
          setUser(res.data);
        })
        .catch(() => {
          logout();
        });
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post('/auth/login', { email, password });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      // Navigate based on role
      if (user.role === 'admin') navigate('/dashboard');
      else if (user.role === 'store_owner') navigate('/dashboard');
      else navigate('/dashboard');
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  };
  

  const register = async (formData) => {
    try {
      await axios.post('/auth/register', formData);


      navigate('/login');
    } catch (err) {
      console.error(err.response?.data);
      throw new Error(err.response?.data?.error || 'Register failed');

    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
