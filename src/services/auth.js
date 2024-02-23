import pkg from "jsonwebtoken";
const { sign } = pkg;
import dotenv from "dotenv";
dotenv.config();
import { UnAuthorizedError } from "../helpers/errors.js";
import { User } from "../models/user.js";
import { getUserByEmail } from "./user.js";

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

// Registrer user
export const register = async (candidate) => {
  const user = new User(candidate);
  await user.save();

  return user;
};

// Login
export const login = async (candidate) => {
  const user = await getUserByEmail(candidate.email);

  if (!user || !(await user.validPassword(candidate.password))) {
    throw new UnAuthorizedError("Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const refreshToken = sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });
  const accessToken = sign(payload, JWT_ACCESS_SECRET, { expiresIn: "15m" });

  await user.updateOne({ refreshToken, accessToken }, { new: true });

  return { refreshToken, accessToken, user };
};

// Logout
export const logout = async (id) => {
  await User.findByIdAndUpdate(id, { accessToken: null, refreshToken: null });

  return true;
};

// Generate ne tokens and update token by user id
export const updateTokensById = async (id) => {
  const payload = {
    id,
  };

  const refreshToken = sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });
  const accessToken = sign(payload, JWT_ACCESS_SECRET, { expiresIn: "15m" });

  const user = await User.findByIdAndUpdate(
    id,
    { refreshToken, accessToken },
    { new: true }
  );

  return { refreshToken, accessToken, user };
};

// export default {
//   register,
//   login,
//   logout,
//   updateTokensById,
// };

const auth = {
  register,
  login,
  logout,
  updateTokensById,
};

export default auth;
