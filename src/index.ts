import { config } from "dotenv";
import express from "express";
import { MongoClient } from "./databases/mongo.js";
import accountRoutes from "./routes/account.routes.js";

const main = async () => {
  config();
  const app = express();
  const port = process.env.PORT;
  app.use(express.json());

  await MongoClient.connect();

  // Accounts Routes
  app.use("/api/account", accountRoutes);

  app.listen(port, () => {
    console.log("Online babys na porta: ", port);
  });
};

main();
