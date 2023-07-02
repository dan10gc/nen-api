import { MongoMemoryServer } from "mongodb-memory-server";
import config from "./config";

export = async function globalSetup() {
  if (config.Memory) {
    const instance: MongoMemoryServer = (global as any).__MONGOINSTANCE__;
    await instance.stop();
  }
};
