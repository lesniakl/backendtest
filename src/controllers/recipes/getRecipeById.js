import { recipes as service } from "../../services/index.js";
import { asyncWrapper, responseData } from "../../helpers/apiHelpers.js";
import { NotFoundError } from "../../helpers/errors.js";

export const getRecipeById = async (req, res) => {
  const { recipeId } = req.params;

  const recipe = await service.getRecipeById(recipeId);

  if (!recipe) {
    throw new NotFoundError(`Recipe with id "${recipeId}" not found`);
  }

  return res.status(200).json(responseData({ recipe }, 200));
};

export default asyncWrapper(getRecipeById);
