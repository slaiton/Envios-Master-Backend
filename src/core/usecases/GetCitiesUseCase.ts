import { CityRepositoryImpl } from "../../infrastructure/repositories/CityRepositoryImpl";
import { City } from "../../core/entities/City";

export class GetCitiesUseCase {
    constructor(private cityRepository: CityRepositoryImpl) {}

    async execute(): Promise<City[]> {
        return await this.cityRepository.getAllCities();
    }
}