import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/admin/Dashboard';
import CreatePost from './pages/admin/CreatePost';
import EditPost from './pages/admin/EditPost';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/admin" />} />

        <Route path="/admin" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/admin/create" element={isAuthenticated ? <CreatePost /> : <Navigate to="/login" />} />
        <Route path="/admin/edit/:id" element={isAuthenticated ? <EditPost /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
