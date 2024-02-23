import { shoppingList as service } from "../../services/index.js";
import { asyncWrapper, responseData } from "../../helpers/apiHelpers.js";
import { MAX_LIMIT_PER_PAGE } from "../../helpers/variables.js";
import { DEFAULT_LIMIT_PER_PAGE } from "../../helpers/variables.js";
import { DEFAULT_PAGE } from "../../helpers/variables.js";

const getShoppingList = async (req, res) => {
  const { id } = req.user;
  const { limit = DEFAULT_LIMIT_PER_PAGE, page = DEFAULT_PAGE } = req.query;
  const pageLimit =
    parseInt(limit) > MAX_LIMIT_PER_PAGE ? MAX_LIMIT_PER_PAGE : parseInt(limit);

  let shoppingList;

  if (req.query.page) {
    shoppingList = await service.getByUserId(id, pageLimit, parseInt(page));
  } else {
    shoppingList = await service.getAll(id);
  }

  res.status(200).json(responseData(shoppingList, 200));
};

export default asyncWrapper(getShoppingList);
