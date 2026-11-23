import type { UserAuthDTO } from "../../../models/user.model.js";

export interface IFindByEmailRepository {
  findByEmail(email: string): Promise<UserAuthDTO | null>;
}
