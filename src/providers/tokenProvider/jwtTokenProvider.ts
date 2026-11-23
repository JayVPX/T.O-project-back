import { SignJWT, jwtVerify } from "jose";

export interface ITokenProvider {
  generate(params: {
    subject: string;
    payload?: Record<string, unknown>;
  }): Promise<string>;

  verify(token: string): Promise<{
    sub: string;
    [key: string]: unknown;
  }>;
}

export class JWTTokenProvider implements ITokenProvider {
  private readonly secret: Uint8Array;

  constructor() {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET não está configurado");
    }

    this.secret = new TextEncoder().encode(secret);
  }

  async generate({
    subject,
    payload = {},
  }: {
    subject: string;
    payload?: Record<string, unknown>;
  }): Promise<string> {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setSubject(subject)
      .setIssuedAt()
      .setIssuer("to-project-api")
      .setAudience("to-project-site")
      .setExpirationTime("15m")
      .sign(this.secret);

    return token;
  }

  async verify(token: string): Promise<{
    sub: string;
    [key: string]: unknown;
  }> {
    const { payload } = await jwtVerify(token, this.secret, {
      algorithms: ["HS256"],
      issuer: "to-project-api",
      audience: "to-project-site",
    });

    if (!payload.sub) {
      throw new Error("Sub do token é inválido");
    }

    return payload as {
      sub: string;
      [key: string]: unknown;
    };
  }
}
