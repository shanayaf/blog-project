import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    content: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8000/api/blogs', form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Blog created!');
      navigate('/blogs'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating blog');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Create New Blog</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            name="title"
            type="text"
            className="form-control"
            placeholder="Enter blog title"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            name="content"
            className="form-control"
            rows="5"
            placeholder="Write your blog content..."
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-success">Post Blog</button>
      </form>
    </div>
  );
};

export default CreateBlog;
