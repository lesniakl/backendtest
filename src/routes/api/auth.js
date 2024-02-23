import { Router } from "express";
import pkg from "passport";
const { authenticate } = pkg;
import { auth as controller } from "../../controllers/index.js";
import { auth as middleware } from "../../middlewares/index.js";

export const authRouter = Router();

authRouter.post("/register", middleware.register, controller.register);
authRouter.post("/login", middleware.login, controller.login);
authRouter.post("/logout", middleware.auth, controller.logout);
authRouter.get("/current", middleware.auth, controller.current);
authRouter.post("/refresh", middleware.refresh, controller.refresh);

export default authRouter;
