import { recipes as service } from "../../services/index.js";
import { asyncWrapper, responseData } from "../../helpers/apiHelpers.js";

export const getNewest = async (req, res) => {
  const categories = req.query.categories.split(",");

  const result = await service.getRecipesByCategories(categories);

  return res.status(200).json(
    responseData(
      {
        categories: result,
      },
      200
    )
  );
};

export default asyncWrapper(getNewest);
