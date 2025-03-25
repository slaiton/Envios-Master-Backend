export interface VehicleRepository {
    getAvailableVehicles(): Promise<void>;
    loadVehicles(): Promise<void>;
}