// In src/services/workoutService.js
// Accept and respond with data in JSON format
// When interacting with an API, you always send specific data with your request or you receive data with the response. There are many different data formats but JSON (Javascript Object Notation) is a standardized format.

// Although there's the term JavaScript in JSON, it's not tied to it specifically. You can also write your API with Java or Python that can handle JSON as well.

// Because of its standardization, API's should accept and respond with data in JSON format.

// Let's take a look at our current implementation and see how we can integrate this best practice.

// First, we create our service layer.

// It's also a good practice to name the service methods the same as the controller methods so that you have a connection between those. Let's start off with just returning nothing.

import { v4 as uuid } from "uuid";
import Workout from "../database/Workout";
import { CreateWorkoutBody } from "../types/shared";

const getAllWorkouts = () => {
  const allWorkouts = Workout.getAllWorkouts();
  return allWorkouts;
};

const getOneWorkout = (workoutId: string) => {
  const workout = Workout.getOneWorkout(workoutId);
  return workout;
};

const createNewWorkout = (newWorkout: CreateWorkoutBody) => {
  const workoutToInsert = {
    ...newWorkout,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };
  try {
    const createdWorkout = Workout.createNewWorkout(workoutToInsert);
    return createdWorkout;
  } catch (error) {
    throw error;
  }
};

const updateOneWorkout = (workoutId: string, changes: CreateWorkoutBody) => {
  const updatedWorkout = Workout.updatedOneWorkout(workoutId, changes);
  return updatedWorkout;
};

const deleteOneWorkout = (workoutId: string) => {
  Workout.deleteOneWorkout(workoutId);
};

export default {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
