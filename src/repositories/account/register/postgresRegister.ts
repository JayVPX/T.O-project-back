import type { IRegisterRepository } from "../../../controllers/account/register/protocols.js";
import type { CreateUserModel, UserModel } from "../../../models/user.model.js";
import { PostgresClient } from "../../../databases/postgree.js";

export class PostgresRegisterRepository implements IRegisterRepository {
  async register(params: CreateUserModel): Promise<UserModel> {
    try {
      const { rows } = await PostgresClient.query(
        `
        INSERT INTO users (
          cpf,
          email,
          first_name,
          last_name,
          password,
          role
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING
          id,
          cpf,
          email,
          first_name,
          last_name,
          role
      `,
        [
          params.cpf,
          params.email,
          params.firstName,
          params.lastName,
          params.password,
          "USER",
        ],
      );

      const user = rows[0];

      if (!user) {
        throw new Error("Nenhum usuário foi encontrado");
      }

      return {
        id: user.id,
        cpf: user.cpf,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
      };
    } catch (error) {
      console.error("ERRO NO POSTGRES:", error);
      throw error;
    }
  }
}
