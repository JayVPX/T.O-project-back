import { config } from "dotenv";
import express from "express";
import { MongoClient } from "./databases/mongo.js";
import { RegisterController } from "./controllers/account/register/register.js";
import { MongoRegisterRepository } from "./repositories/account/register/mongoRegister.js";

const main = async () => {
  config();
  const app = express();
  const port = process.env.PORT;
  app.use(express.json());

  await MongoClient.connect();

  // Register
  app.post("/account/register", async (req, res) => {
    const mongoRegisterRepository = new MongoRegisterRepository();
    const registerController = new RegisterController(mongoRegisterRepository);

    const response = await registerController.handle({ body: req.body });

    const { body, statusCode } = response;

    res.status(statusCode).send(body);
  });

  app.listen(port, () => {
    console.log("Online babys na porta: ", port);
  });
};

main();
