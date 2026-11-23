import * as argon2 from "argon2";

export interface IHashProvider {
  hash(password: string): Promise<string>;

  compare(pass: string, hash: string): Promise<boolean>;
}

export class ArgonHashProvider implements IHashProvider {
  constructor() {}

  async compare(pass: string, hash: string): Promise<boolean> {
    const verify = await argon2.verify(hash, pass);

    return verify;
  }

  async hash(pass: string): Promise<string> {
    const hashPass = await argon2.hash(pass);

    return hashPass;
  }
}
