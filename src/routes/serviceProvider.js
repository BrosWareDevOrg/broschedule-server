import express from "express";
import {
  getProviders,
  getOneProvider,
  createServiceProvider,
  updateProviderInfo,
  removeProvider
} from "../controllers/serviceproviders.js";

const serviceProvider = express.Router();

serviceProvider
  .get("/", getProviders)
  .get("/:id", getOneProvider)
  .post("/", createServiceProvider)
  .put("/:id", updateProviderInfo)
  .delete("/:id", removeProvider);

export default serviceProvider;
