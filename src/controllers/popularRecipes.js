import { asyncWrapper, responseData } from "../helpers/apiHelpers.js";
import { MAX_LIMIT_PER_PAGE } from "../helpers/variables.js";
import { DEFAULT_LIMIT_PER_PAGE } from "../helpers/variables.js";
import { DEFAULT_PAGE } from "../helpers/variables.js";
import { popularRecipes as service } from "../services/index.js";

export const popularRecipes = async (req, res) => {
  let { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT_PER_PAGE } = req.query;
  limit = +limit > MAX_LIMIT_PER_PAGE ? MAX_LIMIT_PER_PAGE : +limit;

  const recipes = await service.get(page, limit);

  res.json(
    responseData(
      {
        ...recipes,
      },
      200
    )
  );
};

export const getRecipes = asyncWrapper(popularRecipes);
