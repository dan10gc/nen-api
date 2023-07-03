// In src/services/workoutService.js
// Accept and respond with data in JSON format
// When interacting with an API, you always send specific data with your request or you receive data with the response. There are many different data formats but JSON (Javascript Object Notation) is a standardized format.

// Although there's the term JavaScript in JSON, it's not tied to it specifically. You can also write your API with Java or Python that can handle JSON as well.

// Because of its standardization, API's should accept and respond with data in JSON format.

// Let's take a look at our current implementation and see how we can integrate this best practice.

// First, we create our service layer.

// It's also a good practice to name the service methods the same as the controller methods so that you have a connection between those. Let's start off with just returning nothing.

import Workout from "../database/Workout";
import { CreateWorkoutBody } from "../types/shared";
import { FilterQuery, Query } from "mongoose";
import WorkoutModel, { WorkoutDocument } from "../models/workout.model";

/**
 * @description Get all workouts from the database
 * @returns
 */
const getAllWorkouts = async () => {
  // remove version from query
  const allWorkouts = await WorkoutModel.find().select("-__v");
  return allWorkouts;
};

/**
 * @description Get one workout from the database
 * @param workoutId String
 * @returns WorkoutDocument
 */
const getOneWorkout = async (workoutId: string) => {
  const workout = await WorkoutModel.findById(workoutId).select("-__v");
  return workout;
};

/**
 * @description Creates a new workout document in the database
 * @param newWorkout
 * @returns WorkoutDocument
 */
const createNewWorkout = async (newWorkout: WorkoutDocument) => {
  return await WorkoutModel.create(newWorkout);
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
