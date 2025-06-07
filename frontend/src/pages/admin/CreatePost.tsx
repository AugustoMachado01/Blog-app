 import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    const res = await fetch('http://localhost:4000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">✍️ Criar Novo Post</h2>
        <form onSubmit={handleCreate} className="space-y-5">
          <input
            type="text"
            placeholder="Título do post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            required
          />

          <textarea
            placeholder="Escreva o conteúdo aqui..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl h-48 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 font-semibold rounded-xl hover:bg-purple-700 transition"
          >
            Publicar Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
