import express from 'express';

import serviceProvider from './serviceProvider.js';

const router = express.Router();

router.use('/provider', serviceProvider);

export default router;
