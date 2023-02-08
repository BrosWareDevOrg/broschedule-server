import express from "express";

import {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
} from '../controllers/user.js';

const router = express.Router();

router
    .get('/', getUsers)
    .get('/:id', getUserById)
    .post('/', createUser)
    .put('/:id', updateUser)
    .put('/:id', deleteUser)

export default router;