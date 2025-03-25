import { Indicator } from "../../core/entities/Indicator";
import { VehicleRepository } from "../../core/interfaces/VehicleRepository";
import { DriverRepository } from "../../core/interfaces/DriverRepository";

export class GetIndicatorsUseCase {
  constructor(
      private driverRepository: DriverRepository,
    private vehicleRepository: VehicleRepository,
) {}

  async execute(): Promise<{}> {

    const availableVehicles:any = await this.vehicleRepository.getAvailableVehicles();
    const availableDrivers:any = await this.driverRepository.getAvailableDrivers();

    // Agregar cantidad de vehículos disponibles al resultado
    return {
      availableVehicles: availableVehicles.length,
      availableDrivers: availableDrivers.length
    };
  }
}