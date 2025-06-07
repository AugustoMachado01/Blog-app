import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware'; 
import { createComment } from '../controllers/comments.controller';

const router = Router();

router.post('/:postId', authenticateToken, createComment);

export default router;
