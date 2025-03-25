import { CityRepositoryImpl } from "../../infrastructure/repositories/CityRepositoryImpl";
import { City } from "../../core/entities/City";

export class GetCityByIdUseCase {
  constructor(private cityRepository: CityRepositoryImpl) {}

  async execute(id: number): Promise<City | null> {
    return await this.cityRepository.getCityById(id);
  }
}