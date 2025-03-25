import { VehicleRepositoryImpl } from "../../infrastructure/repositories/VehicleRepositoryImpl";

export class VehicleUseCase {
    constructor(private vehicleRepository: VehicleRepositoryImpl) {}
      async execute(): Promise<void> {
        return await this.vehicleRepository.getAvailableVehicles()
      }
  }