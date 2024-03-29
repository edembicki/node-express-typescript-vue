import * as jwt from "jsonwebtoken";
import { hash, compareSync } from 'bcryptjs';
import * as dotenv from "dotenv";
import { payload } from "../dto/user.dto";

dotenv.config();
const { JWT_SECRET = "" } = process.env;
export class encrypt {
  static async encryptpass(password: string) {
    return hash(password, 12);
  }
  static comparepassword(hashPassword: string, password: string) {
    return compareSync(password, hashPassword);
  }

  static generateToken(payload: payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  }
}