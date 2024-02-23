import { shoppingList as service } from "../../services/index.js";
import { asyncWrapper, responseData } from "../../helpers/apiHelpers.js";
import { convertShoppingItemData } from "../../helpers/convertShoppingItemData.js";

const addToShoppingList = async (req, res) => {
  const { ingredientId, value, recipeId } = req.body;
  const { id } = req.user;

  const shoppingItem = await service.add({
    ingredient: ingredientId,
    value,
    owner: id,
    recipeId,
  });

  res
    .status(201)
    .json(
      responseData({ shoppingItem: convertShoppingItemData(shoppingItem) }, 201)
    );
};

export default asyncWrapper(addToShoppingList);
