import express from "express";
import {
  getProviders,
  getByIdProvider,
  createServiceProvider,
  updateProviderInfo,
  removeProvider,
} from "../controllers/serviceproviders.js";
import { providerCreateValidation, providerEditValidation } from "../validations/serviceProvider.js";

const serviceProvider = express.Router();

serviceProvider
  .get("/", getProviders)
  .get("/:id", getByIdProvider)
  .post("/", providerCreateValidation, createServiceProvider)
  .put("/:id", providerEditValidation, updateProviderInfo)
  .delete("/:id", removeProvider);

export default serviceProvider;
