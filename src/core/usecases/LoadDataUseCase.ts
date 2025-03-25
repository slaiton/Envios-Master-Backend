import { CityRepository } from '../interfaces/CityRepository';
import { ClientRepository } from '../interfaces/ClientRepository';
// import { OrderRepository } from '../interfaces/OrderRepository';
// import { OrderDetailRepository } from '../interfaces/OrderDetailRepository';
import { VehicleRepository } from '../interfaces/VehicleRepository';
import { DriverRepository } from '../interfaces/DriverRepository';

export class LoadDataUseCase {
  constructor(
    private cityRepo: CityRepository,
    private clientRepo: ClientRepository,
    private vehicleRepo: VehicleRepository,
    private driverRepo: DriverRepository
  ) {}

  async execute(): Promise<void> {
    // Cargar ciudades
    await this.cityRepo.loadCities();

    // // Cargar clientes
    await this.clientRepo.loadClients();

    // // Cargar órdenes
    // await this.orderRepo.loadOrders();

    // // Cargar detalles de la orden
    // await this.orderDetailRepo.loadOrderDetails();

    // // Cargar vehículos
    await this.vehicleRepo.loadVehicles();

    // // Cargar conductores
    await this.driverRepo.loadDrivers();
  }
}