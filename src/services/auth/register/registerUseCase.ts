import type {
  IRegisterUseCase,
  IRegisterRepository,
} from "../../../controllers/auth/register/protocols.js";
import type {
  CreateUserModelDto,
  UserModelDto,
} from "../../../models/user.model.js";
import type { IHashProvider } from "../../../providers/hashProvider/argonHashProvider.js";

export class RegisterUseCase implements IRegisterUseCase {
  constructor(
    private readonly registerRepository: IRegisterRepository,
    private readonly hashProvider: IHashProvider,
  ) {}
  async execute(payload: CreateUserModelDto): Promise<UserModelDto> {
    const { password } = payload;

    const hash = await this.hashProvider.hash(password);

    const user = await this.registerRepository.register({
      ...payload,
      password: hash,
    });

    return user;
  }
}
