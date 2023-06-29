import fs from "fs";
import { WorkoutModel } from "../types/models";

export const saveToDatabase = (DB: WorkoutModel[]) => {
  fs.writeFileSync("./src/database/db.json", JSON.stringify(DB, null, 2), {
    encoding: "utf-8",
  });
};
