import { Indicator } from "../../core/entities/Indicator";
import { IndicatorRepository } from "../../core/interfaces/IndicatorRepository";

export class IndicatorRepositoryImpl implements IndicatorRepository {
  async getIndicators(): Promise<Indicator> {
    return new Indicator(120, 85, 200);
  }
}