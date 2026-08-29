import type { ICreateSaRepository } from "../../../controllers/auth/createSuperAdmin/protocols.js";
import { MongoClient } from "../../../databases/mongo.js";
import type {
  CreateUserModelDto,
  UserModelDto,
} from "../../../models/user.model.js";

export class MongoCreateSaRepository implements ICreateSaRepository {
  async register(params: CreateUserModelDto): Promise<UserModelDto> {
    // const passwordHash = await hash(params.password);

    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne({ ...params, role: "ADMIN" });

    const user = await MongoClient.db
      .collection<Omit<UserModelDto, "id">>("users")
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
