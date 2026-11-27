import "dotenv/config";

import express from "express";
import authRoutes from "./routes/auth.routes.js";
import patientsRoutes from "./routes/patients.routes.js";
import appointmentsRoutes from "./routes/appointments.routes.js";
import availabilityRoutes from "./routes/availability.routes.js";
import { PostgresClient } from "./databases/postgree.js";
import cors from "cors";

const main = async () => {
  const app = express();
  const allowedOrigins = ["http://localhost:5173"];
  const port = process.env.PORT;

  app.use(
    cors({
      origin: allowedOrigins,
    }),
  );

  app.use(express.json());

  await PostgresClient.query("SELECT 1");

  console.log("PostgreSQL conectado");

  // await MongoClient.connect();

  app.use("/api/auth", authRoutes);
  app.use("/api/appointments", appointmentsRoutes);
  app.use("/api/patients", patientsRoutes);
  app.use("/api/availability", availabilityRoutes);
  app.listen(port, () => {
    console.log("Ouvindo:", port);
  });
};

main();
