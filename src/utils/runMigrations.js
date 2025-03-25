"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const database_1 = __importDefault(require("../config/database"));
const migrationsPath = path_1.default.join(__dirname, "../migrations");
function runMigrations() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const files = fs_1.default.readdirSync(migrationsPath).sort();
            for (const file of files) {
                const filePath = path_1.default.join(migrationsPath, file);
                const sql = fs_1.default.readFileSync(filePath, "utf8");
                yield database_1.default.$executeRawUnsafe(sql);
                console.log(`✅ Migración ejecutada: ${file}`);
            }
        }
        catch (error) {
            console.error("Error ejecutando migraciones:", error);
        }
        finally {
            yield database_1.default.$disconnect();
        }
    });
}
runMigrations();
