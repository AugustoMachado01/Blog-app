 import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  createdAt: string;
}

const Dashboard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  const fetchPosts = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    const res = await fetch('http://localhost:4000/api/posts/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      const data = await res.json();
      setPosts(data);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const res = await fetch(`http://localhost:4000/api/posts/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800">📋 Painel de Administração</h2>
          <Link
            to="/admin/create"
            className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition"
          >
            + Novo Post
          </Link>
        </div>

        <div className="mb-6">
          <Link
            to="/"
            className="inline-block text-purple-600 hover:underline"
          >
            ← Voltar para Página Principal
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="text-gray-600 text-center">Nenhuma postagem feita ainda.</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li
                key={post.id}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-5 flex justify-between items-center shadow-sm hover:shadow-md transition"
              >
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{post.title}</h3>
                  <p className="text-sm text-gray-500">
                    Publicado em {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/admin/edit/${post.id}`}
                    className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="px-4 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition"
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
