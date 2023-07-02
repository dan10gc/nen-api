import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import config from "./config";

export = async function globalSetup() {
  if (config.Memory) {
    const instance = await MongoMemoryServer.create();
    const uri = instance.getUri();
    (global as any).__MONGOINSTANCE__ = instance;
    process.env.DATABASE_URL = uri.slice(0, uri.lastIndexOf("/"));
  } else {
    process.env.DATABASE_URL = `mongodb://${config.IP}:${config.Port}`;
  }

  await mongoose.connect(`${process.env.DATABASE_URL}/${config.Database}`);
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
};
