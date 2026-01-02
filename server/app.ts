// packages import
import express from "express";
import dotenv from "dotenv";

// utils import
import { CustomError } from "./src/core/utils/customError";
import globalErrorHandler from "./src/core/utils/globalErrorHandler";

// routes import
import UserRoutes from "./src/modules/user/userRoutes";

dotenv.config();

const app = express();
const port = 3000;

app.get("/api/v1/", (req, res) => {
  res.send("Welcome to Civic Plan app");
});

app.use("/api/v1/user", UserRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.use((req, res, next) => {
  return next(
    new CustomError(`Cant find ${req.originalUrl} on this server.`, 404)
  );
});

app.use(globalErrorHandler);
