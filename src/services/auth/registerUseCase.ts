import type {
  IRegisterRepository,
  IRegisterUseCase,
} from "../../controllers/auth/register/protocols.js";
import type { CreateUserModel, UserModel } from "../../models/user.model.js";

export class RegisterUseCase implements IRegisterUseCase {
  constructor(private readonly registerRepository: IRegisterRepository) {}
  async execute(params: CreateUserModel): Promise<UserModel> {
    const user = await this.registerRepository.register(params);

    return user;
  }
}
