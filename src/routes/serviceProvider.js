import express from "express";
import { getProviders } from "../controllers/serviceproviders.js";

const serviceProvider = express.Router();

serviceProvider
  .get('/', getProviders)
  .post('/',)
  .put('/',)
  .delete('/',)

export default serviceProvider;
