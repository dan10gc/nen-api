import { WorkoutModel } from "./models";

export interface CreateWorkoutBody
  extends Omit<WorkoutModel, "createdAt" | "updatedAt" | "id"> {}
