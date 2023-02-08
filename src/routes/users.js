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
    .delete('/:id', deleteUser)
    .put('/:id', updateUser);

export default router;