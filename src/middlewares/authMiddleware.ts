import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export interface AuthRequest extends Request {
  isAuthenticated?: () => boolean; 
  userId?: number;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "No autorizado. Token no proporcionado" });
      return; // 🔹 Asegura que la ejecución se detiene aquí
  }

  const token = authHeader.split(" ")[1];

  try {
      const secretKey = process.env.JWT_SECRET as string;
      const decoded = jwt.verify(token, secretKey) as { user: { id: number } };

      req.userId = decoded.user.id;
      next();
  } catch (error) {
      res.status(401).json({ message: "Token inválido o expirado" });
      return; // 🔹 Asegura que la ejecución se detiene aquí
  }
};

export default authMiddleware;
