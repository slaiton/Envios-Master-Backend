import { Request, Response } from 'express';
import { CityRepositoryImpl } from '../../infrastructure/repositories/CityRepositoryImpl';
import { LoadDataUseCase } from '../../core/usecases/LoadDataUseCase';
import { ClientRepositoryImpl } from '../../infrastructure/repositories/ClientRepositoryImpl';
// import { OrderRepositoryImpl } from '../../infrastructure/repositories/OrderRepositoryImpl';
// import { OrderDetailRepositoryImpl } from '../../infrastructure/repositories/OrderDetailRepositoryImpl';
import { VehicleRepositoryImpl } from '../../infrastructure/repositories/VehicleRepositoryImpl';
import { DriverRepositoryImpl } from '../../infrastructure/repositories/DriverRepositoryImpl';

const cityRepo = new CityRepositoryImpl();
const clientRepo = new ClientRepositoryImpl();
// const orderRepo = new OrderRepositoryImpl();
// const orderDetailRepo = new OrderDetailRepositoryImpl();
const vehicleRepo = new VehicleRepositoryImpl();
const driverRepo = new DriverRepositoryImpl();

const loadDataUseCase = new LoadDataUseCase(
  cityRepo,
  clientRepo,
  vehicleRepo,
  driverRepo
);

export const loadDataController = async (req: Request, res: Response) => {
  try {
    await loadDataUseCase.execute();
    res.status(200).json({ message: 'Datos cargados exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al cargar los datos' });
  }
};