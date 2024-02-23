// Return correct user object with needed fields
export const convertShoppingItemData = (item) => {
  if (!item) return item;

  const { _id, value, ingredient, recipeId } = item;

  return { _id, value, ingredient, recipeId };
};

export default convertShoppingItemData;
