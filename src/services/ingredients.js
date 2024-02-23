import { Ingredient } from "../models/ingredient.js";

export const getIngredients = async (value) => {
  const searchQuery = {};

  if (value) {
    searchQuery.ttl = { $regex: new RegExp(`^${value}`, "i") };
  }

  return await Ingredient.find({ ttl: searchQuery.ttl });
};

// export default {
//   getIngredients,
// };

const ingredients = {
  getIngredients,
};

export default ingredients;
