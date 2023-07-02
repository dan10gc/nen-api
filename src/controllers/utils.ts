import { Workout } from "../models/workout.model";

export const hasMissingFields = (workout: Workout): boolean => {
  return (
    !workout.name ||
    !workout.mode ||
    !workout.type ||
    !workout.equipment ||
    !workout.exercises ||
    !workout.duration ||
    !workout.distance ||
    !workout.pace
  );
};
