// import { Router } from "express";
// import { ingredient as controller } from "../../controllers/index.js";

// const ingredientRouter = Router();

// ingredientRouter.get("/", controller.getIngredient);

// export default ingredientRouter;

const { Router } = require("express");
const { ingredient: controller } = require("../../controllers/index.js");
const { auth } = require("../../middlewares/index.js");

const ingredientRouter = Router();

ingredientRouter.get("/", auth, controller.getIngredient);

module.exports = ingredientRouter;
