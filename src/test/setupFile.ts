import mongoose from "mongoose";

beforeAll(async () => await mongoose.connect(process.env.DATABASE_URL || ""));

afterAll(async () => await mongoose.disconnect());
