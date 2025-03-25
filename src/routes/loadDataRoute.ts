import { Router } from 'express';
import { LoadDataUseCase } from '../core/usecases/LoadDataUseCase';
import { CityRepositoryImpl } from '../infrastructure/repositories/CityRepositoryImpl';
import { ClientRepositoryImpl } from '../infrastructure/repositories/ClientRepositoryImpl';
import { VehicleRepositoryImpl } from '../infrastructure/repositories/VehicleRepositoryImpl';
import { DriverRepositoryImpl } from '../infrastructure/repositories/DriverRepositoryImpl';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

const loadDataUseCase = new LoadDataUseCase(new CityRepositoryImpl(),  new ClientRepositoryImpl(), new VehicleRepositoryImpl(), new DriverRepositoryImpl());

router.get('/load-data', authMiddleware, async (req, res) => {
  try {
    await loadDataUseCase.execute();
    res.status(200).json({ message: 'Datos cargados exitosamente' });
} catch (error) {
    console.error("Error creating order:", error); 
    
    if (error instanceof Error) {
      
      res.status(500).json({
        message: "Error creating order",
        errorMessage: error.message,
        stack: error.stack 
      });
    } else {
    
      res.status(500).json({
        message: "Error creating order",
        details: error 
      });
    }
  }
});

export default router;