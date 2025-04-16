import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:8000/api/blogs', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => setBlogs(response.data))
    .catch(error => console.error('Error fetching blogs:', error));

    axios.get('http://localhost:8000/api/user', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUserId(res.data.id))
    .catch(err => console.error('Error fetching user:', err));
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      await axios.delete(`http://localhost:8000/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Blog deleted!');
      setBlogs(blogs.filter(blog => blog.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete blog.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Blogs</h2>
      {blogs.length === 0 ? (
        <div className="alert alert-warning">No blogs available.</div>
      ) : (
        blogs.map(blog => (
          <div key={blog.id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">
                <Link to={`/blogs/${blog.id}`} className="text-decoration-none">
                  {blog.title}
                </Link>
              </h5>
              <p className="card-text">{blog.content}</p>
              <p className="card-text">
                <small className="text-muted">By: {blog.user?.name || 'Unknown'}</small>
              </p>
              {blog.user_id === userId && (
                <div className="d-flex">
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => navigate(`/edit/${blog.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogList;
