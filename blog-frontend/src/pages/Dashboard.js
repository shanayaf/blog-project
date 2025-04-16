import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (err) {
        console.error(err);
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.removeItem('token');
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Dashboard</h2>
      {user ? (
        <div className="card p-4">
          <p className="mb-2"><strong>Welcome:</strong> {user.name}</p>
          <p className="mb-3"><strong>Email:</strong> {user.email}</p>
          <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default Dashboard;
