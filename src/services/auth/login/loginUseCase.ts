import type { IFindByEmailRepository } from "../../../controllers/user/findByEmail/protocols.js";
import type { ILoginUseCase } from "../../../controllers/auth/login/protocol.js";
import { AppError } from "../../../errors/appError.js";
import type {
  LoginRequestDTO,
  LoginResponseDTO,
} from "../../../models/auth.model.js";
import type { IHashProvider } from "../../../providers/hashProvider/argonHashProvider.js";
import type { ITokenProvider } from "../../../providers/tokenProvider/jwtTokenProvider.js";

export class LoginUseCase implements ILoginUseCase {
  constructor(
    private readonly userGetByEmail: IFindByEmailRepository,
    private readonly hashProvider: IHashProvider,
    private readonly tokenProvider: ITokenProvider,
  ) {}

  async execute(payload: LoginRequestDTO): Promise<LoginResponseDTO> {
    const { email, password } = payload;

    const user = await this.userGetByEmail.findByEmail(email);

    if (!user) {
      throw new AppError("Email ou senha inválidas", 401);
    }

    const passwordMatch = await this.hashProvider.compare(
      password,
      user.hashPassword,
    );

    if (!passwordMatch) {
      throw new AppError("Email ou senha inválidas", 401);
    }

    const accessToken = await this.tokenProvider.generate({
      subject: user.id,
      payload: {
        role: user.role,
      },
    });

    return {
      user: {
        id: user.id,
        cpf: user.cpf,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: user.role,
        address: user.address,
      },
      accessToken: accessToken,
    };
  }
}
