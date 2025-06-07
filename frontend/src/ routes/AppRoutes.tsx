import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Páginas públicas
import Home from '../pages/Home';
import Post from '../pages/Post';
import Login from '../pages/Login';
import Register from '../pages/Register';

// Páginas administrativas
import Dashboard from '../pages/admin/Dashboard';
import CreatePost from '../pages/admin/CreatePost';
import EditPost from '../pages/admin/EditPost';

// Componente de rota privada simplificado
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Componente principal de rotas sem React.FC
const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/post/:id" element={<Post />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rotas administrativas */}
      <Route path="/admin">
        <Route
          index
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="posts">
          <Route
            path="create"
            element={
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            }
          />
          <Route
            path="edit/:id"
            element={
              <PrivateRoute>
                <EditPost />
              </PrivateRoute>
            }
          />
        </Route>
      </Route>

      {/* Rota de fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;