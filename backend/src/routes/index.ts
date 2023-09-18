import { Router } from 'express';

import { userAuth } from 'middleware';
import { endpoints } from 'resources/constants/endpoints';
import User from 'routes/user';
import postsRouter from 'routes/post';

const router = Router();

router.use(endpoints.USER, User);
router.use(userAuth);
router.use(endpoints.POSTS, postsRouter);

export default router;
