import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { config as dotenvConfig } from "dotenv";
import { ValidationError } from "../helpers/errors.js";

dotenvConfig();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const avatarStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "avatars",
    allowedFormats: ["jpg", "jpeg", "png"],
    transformation: [
      { width: 250, height: 250, crop: "limit" },
      { quality: 100 },
      { fetch_format: "auto" },
      { format: "jpg" },
    ],
  },
});

const recipeStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "recipes",
    allowedFormats: ["jpg", "jpeg", "png"],
    transformation: [
      { width: 500, height: 500, crop: "limit" },
      { quality: 100 },
      { fetch_format: "auto" },
      { format: "jpg" },
    ],
  },
});

const fileFilter = (_req, file, cb) => {
  const [type] = file.mimetype.split("/");

  if (type !== "image") {
    return cb(new ValidationError("You can upload only the image file"));
  }

  cb(null, true);
};

export const avatarImage = multer({
  storage: avatarStorage,
  fileFilter,
});

export const recipeImage = multer({
  storage: recipeStorage,
  fileFilter,
});

export default {
  avatarImage,
  recipeImage,
};
