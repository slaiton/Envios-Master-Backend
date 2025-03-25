import fs from 'fs';
import path from 'path';
import prisma from "../../config/database";


export class DriverRepositoryImpl {

  async getAvailableDrivers (): Promise<void> {
    try {
      const today = new Date();
      
      return await prisma.$queryRawUnsafe(`
        SELECT * FROM drivers
        WHERE licence_date >= '${today.toISOString()}'
        AND social_security_date >= '${today.toISOString()}'
        AND id_status = 1;
      `);

    } catch (error) {
      console.error("Error al obtener vehículos disponibles:", error);
      throw error;
    } 
  }

  async loadDrivers(): Promise<void> {
    try {

      const filePath = path.join(__dirname, '../../infrastructure/data/drivers.json');

      if (!fs.existsSync(filePath)) {
        throw new Error('El archivo drivers.json no existe');
      }

      const fileContent = fs.readFileSync(filePath, 'utf-8');

      if (!fileContent.trim()) {
        throw new Error('El archivo drivers.json está vacío');
      }

      const data = JSON.parse(fileContent);

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No se encontraron ciudades en el archivo drivers.json');
      }

      const values = data
        .map((driver: any) => {
          const licenceDate = driver.licence_date && driver.licence_date.trim() ? `'${driver.licence_date}'` : 'NULL';
          const socialSecurityDate = driver.social_security_date && driver.social_security_date.trim() ? `'${driver.social_security_date}'` : 'NULL';

          return `('${driver.name}', '${driver.last_name}', '${driver.document}', '${driver.cellphone}', '${driver.email}', ${licenceDate}, ${socialSecurityDate}, 1, 1, NOW(), NOW())`;
        })
        .join(',');

      await prisma.$executeRawUnsafe(`
                INSERT INTO drivers (name, last_name, document, number_contact, email, licence_date, social_security_date, id_status, id_user_create, created_at, updated_at) 
                VALUES ${values};
              `);


    } catch (error) {
      console.error('Error al cargar clientes:', error);
      throw error;
    }
  }
}
