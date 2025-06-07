import { useEffect, useState } from 'react';
import { getAllPosts } from '../services/api';
import PostCard from '../components/PostCard';
import Navbar from '../components/Navbar';

interface Post {
  id: number;
  title: string;
  content: string;
  author: { name: string };
  createdAt: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (error) {
        console.error('Erro ao carregar os posts', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
  <Navbar />
  <div className="max-w-5xl mx-auto py-10 px-4">
    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600 text-center mb-10">📰 Últimas Notícias</h1>
    {loading ? (
      <p className="text-gray-600">Carregando...</p>
    ) : posts.length === 0 ? (
      <p className="text-gray-500">Nenhuma notícia publicada ainda.</p>
    ) : (
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    )}
  </div>
</div>
  );
}
