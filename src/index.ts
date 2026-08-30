import "dotenv/config";

import express from "express";
import authRoutes from "./routes/auth.routes.js";
import appointmentsRoutes from "./routes/appointments.routes.js";
import { PostgresClient } from "./databases/postgree.js";

const main = async () => {
  const app = express();
  const port = process.env.PORT;

  app.use(express.json());

  await PostgresClient.query("SELECT 1");

  console.log("PostgreSQL conectado");

  // await MongoClient.connect();

  app.use("/api/auth", authRoutes);
  app.use("/api/appointments", appointmentsRoutes);

  app.listen(port, () => {
    console.log("Ouvindo:", port);
  });
};

main();
