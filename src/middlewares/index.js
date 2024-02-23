import * as error from "./errors.js";
import auth from "./auth.js";
import * as recipe from "./recipe.js";
import * as googleAuth from "./googleAuth.js";
import * as search from "./search.js";
import * as ingredients from "./ingredients.js";
import * as pagination from "./pagination.js";
import * as user from "./user.js";
import * as uploadImage from "./uploadImage.js";
import * as shoppingList from "./shoppingList.js";
import * as favorites from "./favorites.js";
import * as newest from "./newest.js";

export {
  error,
  auth,
  recipe,
  googleAuth,
  search,
  ingredients,
  pagination,
  user,
  uploadImage,
  shoppingList,
  favorites,
  newest,
};

export const middlewares = {
  error,
  auth,
  recipe,
  googleAuth,
  search,
  ingredients,
  pagination,
  user,
  uploadImage,
  shoppingList,
  favorites,
  newest,
};

// const error = require("./errors");
// const auth = require("./auth.js");
// const recipe = require("./recipe");
// const googleAuth = require("./googleAuth");
// const search = require("./search");
// const ingredients = require("./ingredients");
// const pagination = require("./pagination");
// const user = require("./user");
// const uploadImage = require("./uploadImage");
// const shoppingList = require("./shoppingList");
// const favorites = require("./favorites");
// const newest = require("./newest");

// module.exports = {
//   error,
//   auth,
//   recipe,
//   googleAuth,
//   search,
//   ingredients,
//   pagination,
//   user,
//   uploadImage,
//   shoppingList,
//   favorites,
//   newest,
// };
