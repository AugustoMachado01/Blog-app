 
import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
 
import {
  getPosts,
  getPostById,
  getPostToken,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/posts.controller';

const router = Router();

router.get('/', getPosts);
router.get('/me', authenticateToken, getPostToken);
router.get('/:id', getPostById);
router.post('/', authenticateToken, createPost);
router.put('/:id', authenticateToken, updatePost);
router.delete('/:id', authenticateToken, deletePost);

export default router;
