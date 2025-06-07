// import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'; 

export const loginUser = async (email: string, password: string) => {
  const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email,  password }),
      });
      
    if (!response.ok) {
      return null;
    }
      
      const token = await response.json();

     

      console.log("token ===", token);

    
      return token || null
    }
    
export const getAllPosts = async () => {
    const token = localStorage.getItem('token');

     const res = await fetch('http://localhost:4000/api/posts/', {
      headers: { Authorization: `Bearer ${token}` },
    });
  
  return res.json();
};

export const getPostById = async (id: number) => {
  const token = localStorage.getItem('token');

     const res = await fetch(`http://localhost:4000/api/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  
  return res.json();
};

 export const addComment = async (postId: number, content: string, token: string) => {
  const res = await fetch(`${API_URL}/api/comments/${postId}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    throw new Error('Erro ao adicionar comentário');
  }

  const data = await res.json();
  return data;
};

