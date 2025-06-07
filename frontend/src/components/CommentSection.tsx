import { useState } from 'react';
import { addComment } from '../services/api';
import { useParams } from 'react-router-dom';

interface Comment {
  id: number;
  content: string;
  user: {
    name: string;
  };
}

interface Props {
  comments: Comment[];
  onNewComment: () => void;
}

const CommentSection = ({ comments, onNewComment }: Props) => {
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');
  const { id } = useParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Você precisa estar logado para comentar.');
      return;
    }

    try {
      await addComment(Number(id), newComment, token);
      setNewComment('');
      setError('');
      onNewComment(); // atualiza os comentários no componente pai
    } catch (err) {
      console.error(err);
      setError('Erro ao adicionar comentário.');
    }
  };

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">💬 Comentários</h3>

      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escreva um comentário..."
          className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-28"
          required
        />
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          ✍️ Comentar
        </button>
      </form>

      <div className="space-y-5">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm italic">Nenhum comentário ainda. Seja o primeiro a comentar!</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm"
            >
              <p className="text-gray-700">{comment.content}</p>
              <p className="text-sm text-gray-500 mt-2">por <span className="font-medium">{comment.user.name}</span></p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
