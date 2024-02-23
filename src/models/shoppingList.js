import mongoose, { SchemaTypes, model } from "mongoose";
const { Schema } = mongoose;

const shoppingList = new Schema(
  {
    value: {
      type: String,
      required: [true, "Value is required"],
    },
    ingredient: {
      type: SchemaTypes.ObjectId,
      ref: "ingredient",
      required: [true, "Ingredient is required"],
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
      required: [true, "User is required"],
    },
    recipeId: {
      type: SchemaTypes.ObjectId,
      ref: "recipe",
      required: [true, "Recipe id is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

export const ShoppingList = model("shopping-list", shoppingList);

export default ShoppingList;
