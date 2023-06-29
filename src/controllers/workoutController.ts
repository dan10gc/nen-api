import { Request, RequestHandler, Response } from "express";
// Inside our router we will call a different method handled by our controller for each different endpoint.

// Let's create a method for each endpoint. Just sending a message back should be fine for now.

// Inside our service methods we'll be handling our business logic like transforming data structures and communicating with our Database Layer.
import workoutService from "../services/workoutService";
import { CreateWorkoutBody } from "../types/shared";

const getAllWorkouts: RequestHandler = (req, res) => {
  const allWorkouts = workoutService.getAllWorkouts();
  res.send({ status: "OK", data: allWorkouts });
};

interface GetOneWorkoutParams {
  workoutId: string;
}

const getOneWorkout: RequestHandler<GetOneWorkoutParams> = (req, res) => {
  const {
    params: { workoutId },
  } = req;
  // TODO: Error handling
  if (!workoutId) return;
  const workout = workoutService.getOneWorkout(workoutId);
  res.send({ status: "OK", data: workout });
};

// To improve the request validation you normally would use a third party package like express-validator.
const createNewWorkout: RequestHandler<
  unknown,
  unknown,
  CreateWorkoutBody,
  unknown
> = (req, res) => {
  const { body } = req;
  //    Clean up
  if (
    !body.name ||
    !body.mode ||
    !body.equipment ||
    !body.exercises ||
    !body.trainerTips
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
      },
    });
    return;
  }

  const newWorkout = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    exercises: body.exercises,
    trainerTips: body.trainerTips,
  };
  try {
    const createdWorkout = workoutService.createNewWorkout(newWorkout);
    res.status(201).send({ status: "OK", data: createdWorkout });
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
