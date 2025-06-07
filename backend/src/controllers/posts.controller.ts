  import { Request, Response } from 'express';
  import prisma from '../utils/prisma';

  export const getPosts = async (req: Request, res: Response) => { 
    const posts = await prisma.post.findMany({ include: { author: true } });

    if(!posts) {
      res.status(404).json({ msg: "not found"})

      return
    }

    res.json(posts);
  };

  export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(req.params.id) },
      include: { author: true, comments: true },
    });

    if (!post) {
       res.status(404).json({ error: 'Post not found' });
       return
    }

   res.json(post);
   return
  } catch (error) {
    console.error("Erro ao buscar o post:", error);
     res.status(500).json({ error: 'Erro no servidor' });
     return
  }
};


 export const getPostToken = async (req: any, res: Response) => {
  try {
const userId = req.user.userId

console.log(userId);


    if (!userId) {
       res.status(401).json({ error: 'Usuário não autenticado' });
       return
    }

    const posts = await prisma.post.findMany({
      where: { authorId: userId },
      include: { author: true },
    });

    res.json(posts);
  } catch (error) {
    console.error("Erro ao buscar posts do usuário:", error);
    res.status(500).json({ error: "Erro ao buscar posts do usuário autenticado." });
  }
};

  export const createPost = async (req: any, res: Response) => {
    const { title, content } = req.body;
    const post = await prisma.post.create({
      data: { title, content, authorId: req.user.userId },
    });
    res.status(201).json(post);
  };

  export const updatePost = async (req: any, res: Response) => {

    const { title, content } = req.body;
    const post = await prisma.post.update({
      where: { id: Number(req.params.id) },
      data: { title, content },
    });
    
    res.json(post);
  };

  export const deletePost = async (req: any, res: Response) => {
    await prisma.post.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  };
