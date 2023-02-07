import express from "express";

import {
    getUsers,
    getUserById,
    createUser
} from '../controllers/user.js';

const router = express.Router();

router
    .get('/', getUsers)
    .get('/:id', getUserById)
    .post('/', createUser);

export default router;