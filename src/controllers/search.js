import * as service from "../services/search.js";
import { asyncWrapper, responseData } from "../helpers/apiHelpers.js";
import { SearchType } from "../types/searchTypes.js";
import { MAX_LIMIT_PER_PAGE } from "../helpers/variables.js";
import { DEFAULT_LIMIT_PER_PAGE } from "../helpers/variables.js";
import { DEFAULT_PAGE } from "../helpers/variables.js";

export const getRecipeByTitleController = async (req, res) => {
  const {
    type,
    value,
    page = DEFAULT_PAGE,
    limit = DEFAULT_LIMIT_PER_PAGE,
  } = req.query;
  const searchMethod =
    type === SearchType.title
      ? service.getRecipeByTitle
      : service.getRecipeByIngredient;
  const pageLimit =
    parseInt(limit) > MAX_LIMIT_PER_PAGE ? MAX_LIMIT_PER_PAGE : parseInt(limit);
  const [result] = await searchMethod(value, parseInt(page), pageLimit);

  res.status(200).json(
    responseData(
      {
        ...result,
        limit: pageLimit,
        page: parseInt(page),
      },
      200
    )
  );
};

export const getRecipeByTitleOrIngredient = asyncWrapper(
  getRecipeByTitleController
);
