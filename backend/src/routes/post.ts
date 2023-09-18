import { Router } from 'express';

import { validateCreatePostQuery } from 'validations/posts';
import {
  createPost, deletePost, getPosts, updatePost,
} from 'controllers/post';

const postsRouter = Router();

postsRouter.delete('/:postId', deletePost);
postsRouter.post('/', validateCreatePostQuery, createPost);
postsRouter.put('/:postId', validateCreatePostQuery, updatePost);
postsRouter.get('/', getPosts);

export default postsRouter;
