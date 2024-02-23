import { Router } from "express";
export const router = Router();

import { auth as authMiddleware } from "../../middlewares/index.js";

import { ingredients as middleware } from "../../middlewares/index.js";
import { ingredients as controller } from "../../controllers/index.js";

router.use(authMiddleware.auth);
router.get("/", middleware.getIngredients, controller.getIngredients);

export default router;
