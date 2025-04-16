import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:8000/api/register', form);
      alert('Registered successfully. Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <input
            name="name"
            className="form-control"
            placeholder="Name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            name="password_confirmation"
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
};

export default Register;
