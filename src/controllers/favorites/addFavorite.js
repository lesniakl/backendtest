import { favorites as service } from "../../services/index.js";
import { asyncWrapper, responseData } from "../../helpers/apiHelpers.js";
import { DatabaseError } from "../../helpers/errors.js";

export const addFavorite = async (req, res) => {
  const { recipeId } = req.body;
  const { id } = req.user;

  const favoriteRecipe = await service.findFavoriteRecipeByUserId(recipeId, id);

  if (favoriteRecipe) {
    throw new DatabaseError(`Recipe "${recipeId}" already in favorites`);
  }

  const recipe = await service.addRecipeToFavorite(recipeId, id);

  res.status(200).json(responseData({ recipe }, 200));
};

export default asyncWrapper(addFavorite);
