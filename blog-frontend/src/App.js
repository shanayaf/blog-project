import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateBlog from './pages/CreateBlog';
import BlogList from './pages/BlogList';
import EditBlog from './pages/EditBlog'; // ✅ Edit Blog
import BlogDetail from './pages/BlogDetail'; // ✅ Blog Detail
import Navbar from './components/Navbar';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blogs" element={isLoggedIn ? <BlogList /> : <Navigate to="/login" />} />
        <Route path="/blogs/:id" element={isLoggedIn ? <BlogDetail /> : <Navigate to="/login" />} /> {/* ✅ Blog Detail */}
        <Route path="/create" element={isLoggedIn ? <CreateBlog /> : <Navigate to="/login" />} />
        <Route path="/edit/:id" element={isLoggedIn ? <EditBlog /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
