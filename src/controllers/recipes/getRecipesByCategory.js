import { recipes as service } from "../../services/index.js";
import { asyncWrapper, responseData } from "../../helpers/apiHelpers.js";
import { MAX_LIMIT_PER_PAGE } from "../../helpers/variables.js";
import { DEFAULT_LIMIT_PER_PAGE } from "../../helpers/variables.js";
import { DEFAULT_PAGE } from "../../helpers/variables.js";

export const getRecipesByCategory = async (req, res) => {
  const { categoryName } = req.params;
  const { limit = DEFAULT_LIMIT_PER_PAGE, page = DEFAULT_PAGE } = req.query;
  const pageLimit =
    parseInt(limit) > MAX_LIMIT_PER_PAGE ? MAX_LIMIT_PER_PAGE : parseInt(limit);

  const recipes = await service.getRecipesByCategoryName(
    categoryName,
    pageLimit,
    parseInt(page)
  );

  res.status(200).json(responseData(recipes, 200));
};

export default asyncWrapper(getRecipesByCategory);
