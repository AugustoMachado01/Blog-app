import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById, addComment } from '../services/api';
import Navbar from '../components/Navbar';

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  author: { name: string };
}

interface PostType {
  id: number;
  title: string;
  content: string;
  author: { name: string };
  createdAt: string;
  comments: Comment[];
}

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  const fetchPost = async () => {
    try {
      const data = await getPostById(Number(id));
      setPost(data);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar post.');
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) return setError('Você precisa estar logado para comentar.');

      await addComment(Number(id), newComment, token);
      setNewComment('');
      fetchPost(); // Atualiza os comentários
    } catch (err) {
      console.error(err);
      setError('Erro ao enviar comentário.');
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (loading) return <p className="p-4">Carregando post...</p>;
  if (!post) return <p className="p-4">Post não encontrado.</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 bg-white mt-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="text-sm text-gray-500 mb-6">
          Por {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
        </div>
        <p className="text-gray-800 mb-10 whitespace-pre-line">{post.content}</p>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Comentários</h2>

          {post.comments.length === 0 ? (
            <p className="text-gray-500">Nenhum comentário ainda.</p>
          ) : (
            <ul className="space-y-4">
              {post.comments.map((comment) => (
                <li key={comment.id} className="bg-gray-100 p-4 rounded-xl">
                  <p className="text-gray-800">{comment.content}</p>
                  <small className="text-gray-500 block mt-2">
                    {comment.author?.name ?? 'Anônimo'} • {new Date(comment.createdAt).toLocaleString()}
                  </small>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6">
            <textarea
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Escreva um comentário..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
            ></textarea>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button
             onClick={handleCommentSubmit}
              disabled={!newComment.trim()}
              className={`mt-3 px-5 py-2 rounded-xl transition font-medium text-white ${
                newComment.trim()
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-blue-300 cursor-not-allowed'
              }`}
            >
              Enviar Comentário
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
