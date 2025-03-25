// src/infrastructure/repositories/CityRepositoryImpl.ts
import { VehicleRepository } from '../../core/interfaces/VehicleRepository';
import { TypesVehicleRepositoryImpl } from './TypesVehicleRepositoryImpl';
import { BrandRepositoryImpl } from './BrandRepositoryImpl';
import { ClassRepositoryImpl } from './ClassRepositoryImpl';
import fs from 'fs';
import path from 'path';
import prisma from "../../config/database";


export class VehicleRepositoryImpl {
    private brandRepository = new BrandRepositoryImpl();
    private typeRepository = new TypesVehicleRepositoryImpl();
    private classRepository = new ClassRepositoryImpl();

    async getAvailableVehicles (): Promise<void> {
      try {
        const today = new Date();
        
        return await prisma.$queryRawUnsafe(`
          SELECT * FROM vehicles
          WHERE soat_date >= '${today.toISOString()}'
          AND tecno_date >= '${today.toISOString()}'
          AND id_status = 1;
        `);

      } catch (error) {
        console.error("Error al obtener vehículos disponibles:", error);
        throw error;
      } 
    }
  

  async loadVehicles (): Promise<void> {
    try {

      const filePath = path.join(__dirname, '../../infrastructure/data/vehicles.json');

      if (!fs.existsSync(filePath)) {
        throw new Error('El archivo vehicles.json no existe');
      }

      const fileContent = fs.readFileSync(filePath, 'utf-8');

      if (!fileContent.trim()) {
        throw new Error('El archivo vehicles.json está vacío');
      }

      const data = JSON.parse(fileContent);

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No se encontraron ciudades en el archivo vehicles.json');
      }

      const values = await Promise.all(
        data.map(async (vehicle: any) => {

          const idBrand = await this.brandRepository.findOrCreateByName(vehicle.marca.trim());

          const idType = await this.typeRepository.findOrCreateByName(vehicle.tipo);

          const idClass = await this.classRepository.findOrCreateByName(vehicle.clase, idBrand);

          return `('${vehicle.plate}', '${vehicle.model}', ${vehicle.capacity}, ${idBrand}, ${idClass}, ${idType}, '${vehicle.soat}', '${vehicle.tecno}', 1, 1, NOW(), NOW())`;
        })
      );

      if (values.length > 0) {
        await prisma.$queryRawUnsafe(`
          INSERT INTO vehicles (plate, model, capacity, id_brand, id_class, id_type ,soat_date, tecno_date, id_status, id_user_create, created_at, updated_at)
          VALUES ${values.join(',')};
        `);
      }
    } catch (error) {
      console.error('Error al cargar clientes:', error);
      throw error;
    }
  }
}