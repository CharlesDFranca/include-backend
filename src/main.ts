import "express-async-errors";
import "dotenv/config";
import express from "express";
import cors from "cors";
import { MongoClient } from "./infra/database/MongoClient";
import { patientRoutes } from "./application/routes/PatientRoutes";
import { doctorRoutes } from "./application/routes/DoctorRoutes";
import { appointmentRoutes } from "./application/routes/AppointmentRoutes";
import { errorHandler } from "./infra/utils/middlewares/ErrorHandler";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(doctorRoutes);
app.use(patientRoutes);
app.use(appointmentRoutes);

app.use(errorHandler);

MongoClient.Instance.connect();

app.listen(PORT, () => {
  console.log("Servidor rodando na porta: ", PORT);
});
