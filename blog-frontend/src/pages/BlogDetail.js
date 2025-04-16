// src/pages/BlogDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`http://localhost:8000/api/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setBlog(res.data))
    .catch(() => navigate('/blogs'));
  }, [id, token, navigate]);

  if (!blog) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title mb-3">{blog.title}</h2>
          <p className="card-text">{blog.content}</p>
          <p className="card-text">
            <small className="text-muted">By: {blog.user?.name || 'Unknown'}</small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
