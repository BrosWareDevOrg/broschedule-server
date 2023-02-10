import express from 'express';

import {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  removeUser,
} from '../controllers/user.js';
import { userCreateValidation, userEditValidation } from '../validations/user.js';

const router = express.Router();

router
  .get('/', getUsers)
  .get('/:id', getUserById)
  .post('/', userCreateValidation, createUser)
  .put('/:id', userEditValidation, updateUser)
  .patch('/:id', removeUser)
  .delete('/:id', deleteUser);

export default router;
