import { Document, Schema, model } from "mongoose";

export interface Workout {
  name: string;
  mode: string;
  type: "strength" | "running" | "walking";
  duration: string;
  distance: string;
  pace: string;
  equipment: string[];
  exercises: string[];
}

export interface WorkoutDocument extends Workout, Document {
  createdAt: string;
  updatedAt: string;
}

const isCardio = (type: string) => type === "running" || type === "walking";

const workoutSchema = new Schema<Workout>(
  {
    name: { type: String, required: true },
    mode: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["strength", "running", "walking"],
    },
    duration: { type: String, required: true },
    distance: {
      type: String,
      required: function () {
        // @ts-ignore
        return isCardio(this.type);
      },
    },
    pace: {
      type: String,
      required: function () {
        // @ts-ignore
        return isCardio(this.type);
      },
    },
    equipment: {
      type: [String],
      required: function () {
        // @ts-ignore
        return !isCardio(this?.type);
      },
    },
    exercises: {
      type: [String],
      required: function () {
        // @ts-ignore
        return !isCardio(this?.type);
      },
    },
  },
  {
    timestamps: true,
  }
);

export default model<WorkoutDocument>("Workout", workoutSchema);
