import { Workout } from "../models/workout.model";
import { isCardio } from "../utils/validation";

/**
 * @description Checks if a workout has missing fields based on its type and shared fields.
 * @param workout WorkoutModel
 * @returns
 */
export const hasMissingFields = (workout: Workout): boolean => {
  const isCardioWorkout = isCardio(workout.type);
  const hasMissingSharedFields =
    !workout.name || !workout.mode || !workout.type || !workout.duration;
  const hasWorkoutTypeSpecificMissingFields = isCardioWorkout
    ? !workout.distance || !workout.pace
    : !workout.equipment ||
      workout.equipment.length === 0 ||
      !workout.exercises ||
      workout.exercises.length === 0;

  return hasMissingSharedFields || hasWorkoutTypeSpecificMissingFields;
};
