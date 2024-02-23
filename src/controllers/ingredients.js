import { ingredients as service } from "../services/index.js";
import { asyncWrapper, responseData } from "../helpers/apiHelpers.js";

const getRecipeByIngredientController = async (req, res) => {
  const { value } = req.query;
  const ingredients = await service.getIngredients(value);

  res.status(200).json(
    responseData(
      {
        ingredients,
      },
      200
    )
  );
};

export const getIngredients = asyncWrapper(getRecipeByIngredientController);
