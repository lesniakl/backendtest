import { asyncWrapper, responseData } from "../../helpers/apiHelpers.js";
import { NotFoundError } from "../../helpers/errors.js";
import { ownRecipes as service } from "../../services/index.js";

const deleteRecipe = async (req, res) => {
  const { id: owner } = req.user;
  const { recipeId } = req.params;

  const result = await service.deleteById(recipeId, owner);

  if (!result) {
    throw new NotFoundError("Recipe with this id not found");
  }

  res.status(200).json(
    responseData(
      {
        recipe: result,
      },
      200
    )
  );
};

export default asyncWrapper(deleteRecipe);
