// In src/database/Workout.js
// const DB = require("./db.json");
import { WorkoutModel } from "../types/models";
import { CreateWorkoutBody } from "../types/shared";
import DB from "./db.json";
import { saveToDatabase } from "./utils";

const getAllWorkouts = () => {
  return DB.workouts;
};

const getOneWorkout = (workoutId: string) => {
  const workout = DB.workouts.find((workout) => workout.id === workoutId);
  if (!workout) {
    return;
  }
  return workout;
};

const createNewWorkout = (newWorkout: WorkoutModel) => {
  const isAlreadyAdded =
    DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
  if (isAlreadyAdded) {
    throw {
      status: 400,
      message: `Workout with the name '${newWorkout.name}' already exists`,
    };
  }
  try {
    DB.workouts.push(newWorkout);
    // @ts-ignore
    saveToDatabase(DB);
    return newWorkout;
  } catch (error) {
    // @ts-ignore
    throw { status: 500, message: error?.message || error };
  }
};

const updatedOneWorkout = (workoutId: string, changes: CreateWorkoutBody) => {
  const indexForUpdate = DB.workouts.findIndex(
    (workout) => workout.id === workoutId
  );

  if (indexForUpdate === -1) {
    return;
  }

  const updatedWorkout = {
    ...DB.workouts[indexForUpdate],
    ...changes,
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };
  DB.workouts[indexForUpdate] = updatedWorkout;
  // @ts-ignore
  saveToDatabase(DB);
  return updatedWorkout;
};

const deleteOneWorkout = (workoutId: string) => {
  const indexForDelete = DB.workouts.findIndex(
    (workout) => workout.id === workoutId
  );

  if (indexForDelete === -1) {
    return;
  }

  DB.workouts.splice(indexForDelete, 1);
  // @ts-ignore
  saveToDatabase(DB);
};

export default {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updatedOneWorkout,
  deleteOneWorkout,
};
