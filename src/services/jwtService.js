"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET || "default_secret";
class JwtService {
    static generateToken(userId) {
        return jsonwebtoken_1.default.sign({ userId }, SECRET_KEY, { expiresIn: "1h" });
    }
    static verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, SECRET_KEY);
        }
        catch (error) {
            return null;
        }
    }
}
exports.JwtService = JwtService;
