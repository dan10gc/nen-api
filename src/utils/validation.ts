/**
 * @description Check if the type is cardio workout
 * @param type String
 * @returns Boolean
 */
export const isCardio = (type: string) =>
  type === "running" || type === "walking";
