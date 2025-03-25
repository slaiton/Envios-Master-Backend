import { Consecutive } from "../entities/Consecutive";

export interface ConsecutiveRepository {
  generateConsecutive(prefix:string): Promise<string>;
  getLastConsecutive(prefix:string): Promise<string | null>;
}