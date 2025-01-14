import express from "express";
import "dotenv/config";
import { MongoClient } from "./infra/database/MongoClient";
import { patientRoutes } from "./application/routes/PatientRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(patientRoutes);

MongoClient.Instance.connect();

app.listen(PORT, () => {
  console.log("Servidor rodando na porta: ", PORT);
});
