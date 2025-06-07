import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';  

export default function Login() {
  // const navigate = useNavigate();
  const { login } = useAuth();    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const { token } = await loginUser(email, password);

      if (!token) {
        setError('Email ou senha incorretos.');
        return;
      }

      login(token);     
      // navigate('/dfd');  
    } catch (err) {
      setError('Email ou senha incorretos.');
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-indigo-100">
      <Navbar />

      <div className="flex justify-center items-center py-20 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md backdrop-blur-md"
        >
          <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
            Entrar na Conta
          </h1>

          <input
            type="email"
            placeholder="E-mail"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Senha"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-red-600 mb-4 text-sm font-medium text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition"
          >
            Entrar
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Ainda não tem uma conta?{' '}
            <a
              href="/register"
              className="text-purple-600 hover:underline font-medium"
            >
              Registrar agora
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
