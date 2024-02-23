// Return correct user object with needed fields
export const convertUserData = (user) => {
  if (!user) return user;

  const { _id: id, name, email, subscription, avatarURL } = user;

  return { id, name, email, subscription, avatarURL };
};

export default { convertUserData };
