import { config } from "dotenv";
import express from "express";
import { mongoClient } from "./databases/mongo.js";

const main = async () => {
  config();
  const app = express();
  const port = process.env.PORT;
  app.use(express.json());

  await mongoClient.connect();

  app.listen(port, () => {
    console.log("Online babys na porta: ", port);
  });
};

main();
