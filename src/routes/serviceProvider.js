import express from 'express';
import {
  getProviders,
  getByIdProvider,
  createServiceProvider,
  updateProviderInfo,
  removeProvider,
  deleteProvider,
} from '../controllers/serviceproviders.js';

const serviceProvider = express.Router();

serviceProvider
  .get('/', getProviders)
  .get('/:id', getByIdProvider)
  .post('/', createServiceProvider)
  .put('/:id', updateProviderInfo)
  .patch('/:id', removeProvider)
  .delete('/:id', deleteProvider);

export default serviceProvider;
