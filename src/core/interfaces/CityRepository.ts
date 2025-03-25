export interface CityRepository {
    loadCities(): Promise<void>;
}