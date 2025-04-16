import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setForm(response.data);
      } catch (err) {
        setError('Failed to fetch blog');
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8000/api/blogs/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Blog updated!');
      navigate('/blogs');
    } catch (err) {
      setError('Failed to update blog');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Edit Blog</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            name="content"
            rows="5"
            value={form.content}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Update Blog</button>
      </form>
    </div>
  );
};

export default EditBlog;
