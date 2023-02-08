import express from "express";
import {
  getProviders,
  getByIdProvider,
  createServiceProvider,
  updateProviderInfo,
  removeProvider
} from "../controllers/serviceproviders.js";

const serviceProvider = express.Router();

serviceProvider
  .get("/", getProviders)
  .get("/:id", getByIdProvider)
  .post("/", createServiceProvider)
  .put("/:id", updateProviderInfo)
  .put("/:id", removeProvider);

export default serviceProvider;
