import express from "express";
import {
  getProviders,
  getOneProvider,
  createServiceProvider,
} from "../controllers/serviceproviders.js";

const serviceProvider = express.Router();

serviceProvider
  .get("/", getProviders)
  .get("/:id", getOneProvider)
  .post("/", createServiceProvider)
  .put("/:id")
  .delete("/:id");

export default serviceProvider;
