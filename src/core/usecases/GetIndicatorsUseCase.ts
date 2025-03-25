import { Indicator } from "../../core/entities/Indicator";
import { VehicleRepository } from "../../core/interfaces/VehicleRepository";
import { DriverRepository } from "../../core/interfaces/DriverRepository";
import { ClientRepository } from "../../core/interfaces/ClientRepository";

export class GetIndicatorsUseCase {
  constructor(
      private driverRepository: DriverRepository,
    private vehicleRepository: VehicleRepository,
    private clientRepository: ClientRepository,
) {}

  async execute(): Promise<{}> {

    const availableVehicles:any = await this.vehicleRepository.getAvailableVehicles();
    const availableDrivers:any = await this.driverRepository.getAvailableDrivers();
    const allClients:any = await this.clientRepository.getAllClients();

    // Agregar cantidad de vehículos disponibles al resultado
    return {
      availableVehicles: availableVehicles.length,
      availableDrivers: availableDrivers.length,
      allClients: allClients.length
    };
  }
}