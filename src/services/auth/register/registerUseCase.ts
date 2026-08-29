import type {
  IRegisterUseCase,
  IRegisterRepository,
} from "../../../controllers/auth/register/protocols.js";
import type {
  CreateUserModelDto,
  UserModelDto,
} from "../../../models/user.model.js";

export class RegisterUseCase implements IRegisterUseCase {
  constructor(private readonly registerRepository: IRegisterRepository) {}
  async execute(params: CreateUserModelDto): Promise<UserModelDto> {
    const user = await this.registerRepository.register(params);

    return user;
  }
}
