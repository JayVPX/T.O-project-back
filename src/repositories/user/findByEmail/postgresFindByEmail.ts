import type { IFindByEmailRepository } from "../../../controllers/user/findByEmail/protocols.js";
import { PostgresClient } from "../../../databases/postgree.js";
import type { UserAuthDTO, UserModelDto } from "../../../models/user.model.js";

export class PostgresFindByEmail implements IFindByEmailRepository {
  constructor() {}
  async findByEmail(email: string): Promise<UserAuthDTO | null> {
    const { rows } = await PostgresClient.query(
      `
        SELECT id, first_name || ' ' || last_name as name, cpf, email, cellphone, role, address, hash_password
        FROM public."User" 

        WHERE email = $1
        `,
      [email],
    );

    const user = rows[0];

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.cellphone,
      cpf: user.cpf,
      address: user.address,
      role: user.role,
      hashPassword: user.hash_password,
    };
  }
}
