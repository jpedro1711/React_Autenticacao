import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const data = localStorage.getItem('user');
    if (data) {
      setUser(JSON.parse(data));
    }
    setLoading(false);
  }, []);

  async function login(username, password) {
    setLoading(true);
    const response = await axios.post('http://localhost:5240/api/User/login', {
      username: username,
      password: password,
    });
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data));
    setUser(response.data);
    setLoading(false);
  }

  async function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  }

  async function cadastro(username, password) {
    setLoading(true);
    const response = await axios.post(
      'http://localhost:5240/api/User/cadastrar',
      {
        username: username,
        password: password,
        roleId: 2,
      }
    );
    await this.login(username, password);
    setLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), login, user, logout, cadastro, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
