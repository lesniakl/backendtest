import { v2 } from "cloudinary";

import { ValidationError } from "../../helpers/errors.js";
import { asyncWrapper, responseData } from "../../helpers/apiHelpers.js";
import { ownRecipes as service } from "../../services/index.js";

const createRecipe = async (req, res) => {
  const { id: owner } = req.user;

  const recipeData = req.body;
  const parsedIngredients = JSON.parse(recipeData.ingredients);

  const data = {
    ...recipeData,
    ingredients: parsedIngredients,
    owner,
    thumb: req.file.path,
    cloudinaryImageName: req.file.filename,
  };

  try {
    const recipe = await service.create(data);

    res.status(201).json(
      responseData(
        {
          recipe,
        },
        201
      )
    );
  } catch (error) {
    await v2.uploader.destroy(req.file.filename, "image");
    throw new ValidationError("Validation error");
  }
};

export default asyncWrapper(createRecipe);
