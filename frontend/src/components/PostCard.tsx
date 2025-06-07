 import { NavLink } from 'react-router-dom';

interface PostCardProps {
  post: {
    id: number;
    title: string;
    content: string;
    author: { name: string };
    createdAt: string;
  };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-md border border-purple-200 p-6 rounded-3xl shadow-md hover:shadow-xl transition duration-300 group">
      <h2 className="text-2xl font-extrabold mb-3 text-purple-700 group-hover:text-purple-900 transition-colors duration-200">
        <NavLink
          to={`/post/${post.id}`}
          className="hover:underline underline-offset-2 decoration-purple-500"
        >
          {post.title}
        </NavLink>
      </h2>
      <p className="text-gray-800 mb-5 leading-relaxed">
        {post.content.slice(0, 120)}...
      </p>
      <div className="text-sm text-gray-500 flex items-center justify-between">
        <span>
          Por <span className="font-medium">{post.author?.name ?? 'Desconhecido'}</span>
        </span>
        <span className="ml-2">{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
