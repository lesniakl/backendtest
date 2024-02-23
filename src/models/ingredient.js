import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const ingredient = new Schema(
  {
    ttl: {
      type: String,
      required: [true, "Recipe title is required"],
    },
    desc: {
      type: String,
      require: [true, "Recipe description is required"],
    },
    t: {
      type: String,
      default: "",
    },
    thb: {
      type: String,
      required: [true, "Set image"],
    },
  },
  { timestamps: true }
);

export const Ingredient = model("ingredient", ingredient);

export default Ingredient;
