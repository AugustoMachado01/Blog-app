import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const createComment = async (req: any, res: Response) => {
  const { content } = req.body;
  const { postId } = req.params;

  const comment = await prisma.comment.create({
    data: {
      content,
      postId: Number(postId),
      userId: req.user.userId,
    },
  });

  res.status(201).json(comment);
};
