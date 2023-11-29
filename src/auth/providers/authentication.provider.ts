import * as bcrypt from "bcryptjs";

export class AuthenticationProvider {

  static async generateHash(password: string): Promise<string> {
    return bcrypt.hashSync(password, 10);
  }

  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}