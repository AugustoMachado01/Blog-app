import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-purple-700 hover:text-purple-800 transition tracking-wide">
          BlogApp
        </Link>

        <div className="space-x-6 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-purple-600 transition">Início</Link>

          {isAuthenticated ? (
            <>
              <Link to="/admin" className="hover:text-purple-600 transition">Painel</Link>
              <button onClick={handleLogout} className="text-red-600 hover:text-red-800 transition">Sair</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-purple-600 transition">Login</Link>
              <Link to="/register" className="hover:text-purple-600 transition">Registrar</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
