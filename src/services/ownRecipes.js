import { v2 } from "cloudinary";

import { Recipe } from "../models/recipe.js";

const create = async (data) => {
  const recipe = await Recipe.create(data);
  return recipe;
};

const deleteById = async (id, owner) => {
  const recipe = Recipe.findById(id);

  if (recipe.cloudinaryImageName) {
    await v2.uploader.destroy(recipe.cloudinaryImageName, "image");
  }

  const result = await Recipe.findOneAndRemove({ _id: id, owner });

  return result;
};

const get = async (owner, page, limit) => {
  const pipeline = [
    {
      $match: { owner },
    },
    {
      $facet: {
        recipes: [{ $skip: page * limit - limit }, { $limit: limit }],
        count: [{ $count: "total" }],
      },
    },
    {
      $project: {
        recipes: 1,
        total: { $arrayElemAt: ["$count.total", 0] },
        page: { $literal: page },
        limit: { $literal: limit },
      },
    },
  ];

  const results = await Recipe.aggregate(pipeline);
  return results[0];
};

// export default {
//   create,
//   deleteById,
//   get,
// };

const ownRecipes = {
  create,
  deleteById,
  get,
};

export default ownRecipes;
