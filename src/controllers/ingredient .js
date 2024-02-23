import { find } from "../models/ingredient.js";
import { asyncWrapper } from "../helpers/apiHelpers.js";

const getIngredientHandler = async (req, res) => {
  const ingredients = await find();
  res.send(ingredients);
};

export const getIngredient = asyncWrapper(getIngredientHandler);
