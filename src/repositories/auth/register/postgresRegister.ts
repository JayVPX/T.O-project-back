import type { IRegisterRepository } from "../../../controllers/auth/register/protocols.js";
import { PostgresClient } from "../../../databases/postgree.js";
import type {
  CreateUserModelDto,
  UserModelDto,
} from "../../../models/user.model.js";

export class PostgresRegisterRepository implements IRegisterRepository {
  async register(payload: CreateUserModelDto): Promise<UserModelDto> {
    try {
      const { rows } = await PostgresClient.query(
        `
        INSERT INTO "User" (
          cellphone,
          email,
          first_name,
          last_name,
          hash_password,
          cpf,
          role
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING
          id,
          cellphone,
          email,
          first_name || ' ' || last_name as name,
          cpf,
          role
      `,
        [
          payload.phone,
          payload.email,
          payload.firstName,
          payload.lastName,
          payload.password,
          payload.cpf,
          "USER",
        ],
      );

      const user = rows[0];

      if (!user) {
        throw new Error("Nenhum usuário foi encontrado");
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        cpf: user.cpf,
        role: user.role,
      };
    } catch (error) {
      console.error("ERRO NO POSTGRES:", error);
      throw error;
    }
  }
}
