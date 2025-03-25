import { Indicator } from "../entities/Indicator";

export interface IndicatorRepository {
    getIndicators(): Promise<Indicator>;
  }