import Recipe from "../models/recipe.js";

export const getRecipeByTitle = async (value, page, limit) => {
  return await Recipe([
    { $match: { title: { $regex: new RegExp(value, "i") } } },
    {
      $facet: {
        recipes: [
          { $skip: parseInt((page - 1) * limit) },
          { $limit: parseInt(limit) },
        ],
        count: [{ $count: "total" }],
      },
    },
    {
      $project: {
        recipes: {
          _id: true,
          title: true,
          thumb: true,
          description: true,
        },
        total: { $arrayElemAt: ["$count.total", 0] },
      },
    },
  ]);
};

export const getRecipeByIngredient = async (value, page, limit) => {
  const recipes = await Recipe([
    {
      $lookup: {
        from: "ingredients",
        localField: "ingredients.id",
        foreignField: "_id",
        as: "ingredients",
      },
    },
    { $match: { "ingredients.ttl": { $regex: new RegExp(value, "i") } } },
    {
      $facet: {
        recipes: [
          { $skip: parseInt((page - 1) * limit) },
          { $limit: parseInt(limit) },
        ],
        count: [{ $count: "total" }],
      },
    },
    {
      $project: {
        recipes: {
          _id: true,
          title: true,
          thumb: true,
          description: true,
        },
        total: { $arrayElemAt: ["$count.total", 0] },
      },
    },
  ]);

  return recipes;
};

// export default {
//   getRecipeByTitle,
//   getRecipeByIngredient,
// };

const search = {
  getRecipeByTitle,
  getRecipeByIngredient,
};

export default search;
