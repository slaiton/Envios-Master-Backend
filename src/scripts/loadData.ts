import { LoadDataUseCase } from "../core/usecases/LoadDataUseCase";
import { CityRepositoryImpl } from "../infrastructure/repositories/CityRepositoryImpl";
import { ClientRepositoryImpl } from "../infrastructure/repositories/ClientRepositoryImpl";
import { VehicleRepositoryImpl } from "../infrastructure/repositories/VehicleRepositoryImpl";
import { DriverRepositoryImpl } from "../infrastructure/repositories/DriverRepositoryImpl";

async function runLoadData() {
  try {
    console.log("Iniciando carga de datos...");

    const cityRepo = new CityRepositoryImpl();
    const clientRepo = new ClientRepositoryImpl();
    const vehicleRepo = new VehicleRepositoryImpl();
    const driverRepo = new DriverRepositoryImpl();

    const loadDataUseCase = new LoadDataUseCase(cityRepo, clientRepo, vehicleRepo, driverRepo);

    await loadDataUseCase.execute();

    console.log("✅ Datos cargados exitosamente.");
  } catch (error) {
    console.error("Error al ejecutar la carga de datos:", error);
  }
}

// Ejecuta el script
runLoadData();