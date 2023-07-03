import { Request, RequestHandler, Response } from "express";
// Inside our router we will call a different method handled by our controller for each different endpoint.

// Let's create a method for each endpoint. Just sending a message back should be fine for now.

// Inside our service methods we'll be handling our business logic like transforming data structures and communicating with our Database Layer.
import workoutService from "../services/workout.service";
import { CreateWorkoutBody } from "../types/shared";
import WorkoutModel from "../models/workout.model";
import { hasMissingFields } from "./utils";
import { isValidObjectId } from "mongoose";
import { GetOneWorkoutParams } from "./types";

const getAllWorkouts: RequestHandler = async (req, res) => {
  try {
    const allWorkouts = await workoutService.getAllWorkouts();
    res.send({ status: "OK", data: allWorkouts });
  } catch (error) {
    res
      // @ts-ignore
      .status(error?.status || 500)
      // @ts-ignore
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneWorkout: RequestHandler<GetOneWorkoutParams> = async (req, res) => {
  const {
    params: { workoutId },
  } = req;
  if (!workoutId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Workout ID is missing in request params" },
    });
    return;
  }

  if (!isValidObjectId(workoutId)) {
    return res.status(400).send({
      status: "FAILED",
      data: { error: "Invalid params" },
    });
  }
  try {
    const workout = await workoutService.getOneWorkout(workoutId);
    if (!workout) {
      return res.status(404).send({
        status: "FAILED",
        data: { error: "Workout not found" },
      });
    }
    res.send({ status: "OK", data: workout });
  } catch (error) {
    res
      // @ts-ignore
      .status(error?.status || 500)
      // @ts-ignore
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

// To improve the request validation you normally would use a third party package like express-validator.
const createNewWorkout: RequestHandler<
  unknown,
  unknown,
  CreateWorkoutBody,
  unknown
> = async (req, res) => {
  const { body } = req;

  if (hasMissingFields(body)) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'type', 'duration', 'distance', 'pace'",
      },
    });
    return;
  }

  const newWorkout = new WorkoutModel({
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    exercises: body.exercises,
    duration: body.duration,
    distance: body.distance,
    pace: body.pace,
    type: body.type,
  });
  try {
    const createdWorkout = await workoutService.createNewWorkout(newWorkout);
    res
      .status(201)
      .send({ status: "OK", data: { workoutId: createdWorkout._id } });
  } catch (error: unknown) {
    res
      // @ts-ignore
      .status(error?.status || 500)
      // @ts-ignore
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneWorkout = (req: Request, res: Response) => {
  const {
    body,
    params: { workoutId },
  } = req;
  if (!workoutId) return;
  const updatedWorkout = workoutService.updateOneWorkout(workoutId, body);
  res.send({ status: "OK", data: updatedWorkout });
};

const deleteOneWorkout = (req: Request, res: Response) => {
  const {
    params: { workoutId },
  } = req;
  if (!workoutId) return;

  workoutService.deleteOneWorkout(workoutId);
  res.status(204).send({ status: "OK" });
};

export default {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
