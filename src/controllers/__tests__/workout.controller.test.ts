import workoutController from "../workout.controller";
import { Request } from "express";
import workoutModel, { Workout } from "../../models/workout.model";

const mockBody: Workout = {
  name: "5x5 Stronglifts",
  mode: "Upper Body",
  equipment: ["test"],
  exercises: ["test"],
  type: "strength",
  duration: "45:00 min",
  distance: "",
  pace: "",
};

describe("[Controller]: createNewWorkout", () => {
  // it should return workout id
  it("should return workout id", async () => {
    // @ts-ignore
    const req: Request = {
      body: mockBody,
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    // @ts-ignore
    await workoutController.createNewWorkout(req, res, jest.fn());
    const workout = await workoutModel.findOne({ name: "5x5 Stronglifts" });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      status: "OK",
      data: { workoutId: workout?._id },
    });
  });
  // it should return 400 if request body is missing fields
  it("should return 400 if request body is missing fields", async () => {
    // @ts-ignore
    const req: Request = {
      body: { ...mockBody, exercises: [] },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    // @ts-ignore
    await workoutController.createNewWorkout(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'type', 'duration', 'distance', 'pace'",
      },
    });
  });
  // it should return 500 if workoutService throws an error
  it("should return 500 if workoutService throws an error", async () => {
    // @ts-ignore
    const req: Request = {
      body: { ...mockBody, type: "test", exercises: ["test"], duration: 1 },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // @ts-ignore
    await workoutController.createNewWorkout(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      status: "FAILED",
      data: {
        error:
          "Workout validation failed: type: `test` is not a valid enum value for path `type`.",
      },
    });
  });
});