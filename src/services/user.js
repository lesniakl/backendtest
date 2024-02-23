import { User } from "../models/user.js";

// Get user by email
export const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });

  return user;
};

// Get user by email verification token
export const getUserByVerificationToken = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });

  return user;
};

// Get user by id
export const getUserById = async (id) => {
  const user = await User.findById(id);

  return user;
};

// Get user by refresh token
export const getUserByRefreshToken = async (refreshToken) => {
  const user = await User.findOne({ refreshToken });

  return user;
};

// updateUserProfileData
export const updateUserProfile = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  return user;
};

export const checkSubscriptionStatus = async (id, email) => {
  const [currentUserProfile, userSubscribedByEmail] = await Promise.all([
    User.findById(id),
    User.findOne({ subscription: email }),
  ]);

  return { currentUserProfile, userSubscribedByEmail };
};

export const user = {
  getUserByEmail,
  getUserByRefreshToken,
  getUserByVerificationToken,
  getUserById,
  updateUserProfile,
  checkSubscriptionStatus,
};

export default user;
