import { DriverRepositoryImpl } from "../../infrastructure/repositories/DriverRepositoryImpl";

export class DriverUseCase {
    constructor(private driverRepository: DriverRepositoryImpl) {}
      async execute(): Promise<void> {
        return await this.driverRepository.getAvailableDrivers()
      }
  }