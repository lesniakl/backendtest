import { Router } from "express";
import { user as controller, achievements } from "../../controllers/index.js";
import { middlewares } from "../../middlewares/index.js";
const {
  user: middleware,
  auth: authMiddleware,
  uploadImage: { avatarImage },
} = middlewares;

export const usersRouter = Router();

usersRouter.use(authMiddleware.auth);
usersRouter.patch(
  "/",
  avatarImage.single("avatar"),
  middleware.noData,
  middleware.edit,
  controller.editProfile
);
usersRouter.patch(
  "/subscribe",
  middleware.subscribe,
  controller.addSubscription
);
usersRouter.get("/achievements", achievements.get);
export default usersRouter;
