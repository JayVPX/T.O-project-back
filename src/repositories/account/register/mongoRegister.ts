import { hash } from "crypto";
import type { IRegisterRepository } from "../../../controllers/account/register/protocols.js";
import { MongoClient } from "../../../databases/mongo.js";
import type { CreateUserModel, UserModel } from "../../../models/user.model.js";

export class MongoRegisterRepository implements IRegisterRepository {
  async register(params: CreateUserModel): Promise<UserModel> {
    // const passwordHash = await hash(params.password);

    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne({ ...params, role: "USER" });

    const user = await MongoClient.db
      .collection<Omit<UserModel, "id">>("users")
      .findOne({ _id: insertedId });

    if (!user) {
      throw new Error("Nenhum usuário foi encontrado");
    }

    const { _id } = user;

    return {
      id: _id.toHexString(),
      cpf: user.cpf,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };
  }
}
