import express, { Express } from "express";
import bodyParser from "body-parser";
// Routes
import v1WorkoutRouter from "./v1/routes/workoutRoutes";
// const v1WorkoutRouter = require("./v1/routes/workoutRoutes");

const app: Express = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/v1/workouts", v1WorkoutRouter);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running on PORT ${PORT}`);
});
