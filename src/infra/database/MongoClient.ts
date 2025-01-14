import mongoose from "mongoose";

export class MongoClient {
  private static instance: MongoClient;

  private constructor() {}

  public static get Instance(): MongoClient {
    if (!MongoClient.instance) {
      MongoClient.instance = new MongoClient();
    }

    return MongoClient.instance;
  }

  async connect() {
    try {
      const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@backendinclude.z1hsu.mongodb.net/`;

      mongoose.connect(url);
      console.log("Conectado com sucesso");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log("database error: ", err.message);
        return;
      }

      console.log("Something went wrong", err);
    }
  }
}
