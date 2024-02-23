import { Router } from "express";
import { shoppingList as controller } from "../../controllers/index.js";
import {
  shoppingList as middleware,
  auth as authMiddleware,
  pagination as paginationMiddleware,
} from "../../middlewares/index.js";

export const shoppingListRouter = Router();

shoppingListRouter.use(authMiddleware.auth);
shoppingListRouter
  .get("/", paginationMiddleware.pagination, controller.get)
  .post("/", middleware.add, controller.add)
  .delete(
    "/:id",
    middleware.deleteValidator,
    controller.removeFromShoppingList
  );
