import { favorites as service } from "../../services/index.js";
import { asyncWrapper, responseData } from "../../helpers/apiHelpers.js";
import { MAX_LIMIT_PER_PAGE } from "../../helpers/variables.js";
import { DEFAULT_LIMIT_PER_PAGE } from "../../helpers/variables.js";
import { DEFAULT_PAGE } from "../../helpers/variables.js";

export const getFavorite = async (req, res) => {
  const { id } = req.user;
  let { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT_PER_PAGE } = req.query;
  limit = +limit > MAX_LIMIT_PER_PAGE ? MAX_LIMIT_PER_PAGE : +limit;

  const recipes = await service.getFavoritesRecipes(id, parseInt(page), limit);

  res.status(200).json(responseData({ ...recipes }, 200));
};
export default asyncWrapper(getFavorite);
