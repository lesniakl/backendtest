import { favorites as service } from "../../services/index.js";
import { asyncWrapper, responseData } from "../../helpers/apiHelpers.js";
import { NotFoundError } from "../../helpers/errors.js";

export const deleteFavorite = async (req, res) => {
  const { id } = req.user;
  const { recipeId } = req.params;

  const favoriteRecipe = await service.findFavoriteRecipeByUserId(recipeId, id);

  if (!favoriteRecipe) {
    throw new NotFoundError(`Favorite recipe with id "${recipeId}" not found`);
  }

  const recipe = await service.deleteRecipeFromFavorites(recipeId, id);

  res.json(responseData({ recipe }, 200));
};

export default asyncWrapper(deleteFavorite);
