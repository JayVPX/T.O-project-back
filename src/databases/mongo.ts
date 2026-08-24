import { MongoClient as Mongo, Db } from "mongodb";

export const mongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,
  async connect(): Promise<void> {
    try {
      const username = process.env.MONGO_USER ?? "";
      const password = process.env.MONGO_PASS ?? "";
      const url = process.env.MONGO_URL ?? "";

      const client = await new Mongo(url, {
        auth: { username: username, password: password },
      });

      const db = client.db("teste-database");

      this.client = client;
      this.db = db;

      console.log("Conectado ao Mongo");
    } catch {
      console.log("Erro ao conectar ao Mongo");
    }
  },
};
