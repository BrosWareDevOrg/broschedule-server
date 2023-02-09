import express from 'express';

import {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  removeUser,
} from '../controllers/user.js';

const router = express.Router();

router
  .get('/', getUsers)
  .get('/:id', getUserById)
  .post('/', createUser)
  .put('/:id', updateUser)
  .patch('/:id', removeUser)
  .delete('/:id', deleteUser);

export default router;
