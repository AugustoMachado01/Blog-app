 import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      try {
        const res = await fetch(`http://localhost:4000/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setTitle(data.title);
          setContent(data.content);
        } else {
          console.error('Erro ao carregar post.');
        }
      } catch (err) {
        console.error('Erro de rede:', err);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:4000/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        navigate('/admin');
      } else {
        console.error('Erro ao atualizar post.');
      }
    } catch (err) {
      console.error('Erro de rede ao atualizar:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800">✏️ Editar Post</h2>
          <Link
            to="/admin"
            className="text-purple-600 hover:underline"
          >
            ← Voltar ao Painel
          </Link>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Título</label>
            <input
              type="text"
              placeholder="Digite o título..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Conteúdo</label>
            <textarea
              placeholder="Escreva o conteúdo aqui..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl h-48 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition font-medium"
          >
            💾 Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
