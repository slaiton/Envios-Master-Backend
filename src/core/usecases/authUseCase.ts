import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser } from "../../infrastructure/repositories/userRepository";
import { HttpError } from "../../errors/HttpError";

export const registerUser = async (name: string, email: string, password: string, id_rol:number, id_client:number) => {
  if (!name || !email || !password || !id_rol || !id_client) {
    throw new HttpError("Todos los campos son obligatorios", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return await createUser(name, email, hashedPassword, id_rol, id_client);
};

export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new HttpError("Usuario no encontrado", 400);
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new HttpError("Contraseña incorrecta", 400);
  }

  const token:any = jwt.sign({ user: user }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
  
  return {token: token, user: user}
};