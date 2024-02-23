import express, { json } from "express";
import logger from "morgan";
import cors from "cors";
import { serve, setup } from "swagger-ui-express";
import swaggerDocument from "../swagger.json" assert { type: "json" };
import { responseError } from "./helpers/apiHelpers.js";
import { RouteNotFoundError } from "./helpers/errors.js";
import { errorMiddleware } from "./middlewares/errors.js";
import { authRouter } from "./routes/api/auth.js";
import { router } from "./routes/api/ingredients.js";
import { usersRouter } from "./routes/api/users.js";
import { shoppingListRouter } from "./routes/api/shoppingList.js";
import { routerRecipe } from "./routes/api/recipes.js";

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(json());

// add you routes here

app.use("/api-docs", serve, setup(swaggerDocument));
app.use("/api/auth", authRouter);
app.use("/api/ingredients", router);
app.use("/api/users", usersRouter);
app.use("/api/shopping-lists", shoppingListRouter);
app.use("/api/recipes", routerRecipe);

//==========================

app.use((_, res) => {
  res.status(404).json(responseError(new RouteNotFoundError()));
});

export const listen = (port, callback) => {
  app.listen(port, callback);
};

app.use(errorMiddleware);

export default app;
