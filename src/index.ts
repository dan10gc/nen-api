import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express, { Express } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
// Routes
import v1WorkoutRouter from "./v1/routes/workout.routes";
// const v1WorkoutRouter = require("./v1/routes/workoutRoutes");
const mongoString = process.env.DATABASE_URL;

// @ts-ignore
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on("error", (error) => {
  console.error(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app: Express = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/v1/workouts", v1WorkoutRouter);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running on PORT ${PORT}`);
});
