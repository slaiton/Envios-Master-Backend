import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "default_secret";

export class JwtService {
  static generateToken(userId: number): string {
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1h" });
  }

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (error) {
      return null;
    }
  }
}