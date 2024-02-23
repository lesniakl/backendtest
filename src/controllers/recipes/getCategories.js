import { asyncWrapper, responseData } from "../../helpers/apiHelpers.js";
import { CATEGORIES } from "../../helpers/variables.js";

export const getCategories = async (_req, res) => {
  return res.status(200).json(
    responseData(
      {
        categories: CATEGORIES,
      },
      200
    )
  );
};

export default asyncWrapper(getCategories);
