import express from "express";
import "dotenv/config";
import { MongoClient } from "./infra/database/MongoClient";

const app = express();
const PORT = process.env.PORT || 3000;

MongoClient.Instance.connect();

app.listen(PORT, () => {
  console.log("Servidor rodando na porta: ", PORT);
});
