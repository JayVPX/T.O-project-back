import type { IRegisterRepository } from "../../../controllers/auth/register/protocols.js";
import { PostgresClient } from "../../../databases/postgree.js";
import type {
  CreateUserModelDto,
  UserModelDto,
} from "../../../models/user.model.js";

export class PostgresRegisterRepository implements IRegisterRepository {
  async register(params: CreateUserModelDto): Promise<UserModelDto> {
    try {
      const { rows } = await PostgresClient.query(
        `
        INSERT INTO 'USER' (
          cellphone,
          email,
          first_name,
          last_name,
          password,
          role
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING
          id,
          cellphone,
          email,
          first_name,
          last_name,
          role
      `,
        [
          params.cellphone,
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
        email: user.email,
        cellphone: user.cellphone,
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
