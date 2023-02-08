import express from 'express';
import usersRouter from './users.js';

import serviceProvider from './serviceProvider.js';

const router = express.Router();

router.use('/provider', serviceProvider);
router.use("/users", usersRouter);

export default router;
