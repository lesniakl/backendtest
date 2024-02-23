import { Router } from "express";
import { getAllRecipes } from "../../controllers/recipes/getAllRecipes.js";
import { getCategories } from "../../controllers/recipes/getCategories.js";
import { getNewest } from "../../controllers/recipes/getNewest.js";
import { getRecipesByCategory } from "../../controllers/recipes/getRecipesByCategory.js";
import { getRecipeById } from "../../controllers/recipes/getRecipeById.js";

import { ownRecipes } from "../../controllers/index.js";
import { popularRecipes } from "../../controllers/index.js";
import { search } from "../../controllers/index.js";
import { favorites } from "../../controllers/index.js";
import { middlewares } from "../../middlewares/index.js";
const {
  auth: authMiddleware,
  recipe: middleware,
  search: serachMiddleware,
  favorites: favoritesMiddleware,
  pagination: paginationMiddleware,
  newest: newestMiddleware,
  uploadImage: { recipeImage },
} = middlewares;
import { body, params } from "../../types/requestFieldType.js";
export const routerRecipe = Router();

routerRecipe.use(authMiddleware.auth);

routerRecipe.get("/", paginationMiddleware.pagination, getAllRecipes);
routerRecipe.get("/categories", getCategories);
routerRecipe.get("/newest", newestMiddleware.newest, getNewest);
routerRecipe.get(
  "/own",
  paginationMiddleware.pagination,
  ownRecipes.getOwnRecipes
);
routerRecipe.get(
  "/popular",
  paginationMiddleware.pagination,
  popularRecipes.getRecipes
);
routerRecipe.get(
  "/search",
  serachMiddleware.searchRecipe,
  search.getRecipeByTitleOrIngredient
);
routerRecipe.get(
  "/favorites",
  paginationMiddleware.pagination,
  favorites.getFavorite
);
routerRecipe.get(
  "/categories/:categoryName",
  middleware.recipeCategoryName,
  paginationMiddleware.pagination,
  getRecipesByCategory
);
routerRecipe.get("/:recipeId", middleware.recipeId, getRecipeById);

routerRecipe.post(
  "/own",
  recipeImage.single("thumb"),
  middleware.recipe,
  ownRecipes.createRecipe
);
routerRecipe.post(
  "/favorites",
  favoritesMiddleware.recipeId(body),
  favorites.addFavorite
);
routerRecipe.delete(
  "/own/:recipeId",
  middleware.recipeId,
  ownRecipes.deleteRecipe
);
routerRecipe.delete(
  "/favorites/:recipeId",
  favoritesMiddleware.recipeId(params),
  favorites.deleteFavorite
);

export default routerRecipe;
