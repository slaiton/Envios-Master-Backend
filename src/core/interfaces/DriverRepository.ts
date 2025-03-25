export interface DriverRepository {
    loadDrivers(): Promise<void>;
    getAvailableDrivers(): Promise<void>;
}