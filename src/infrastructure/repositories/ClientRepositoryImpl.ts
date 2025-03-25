// src/infrastructure/repositories/CityRepositoryImpl.ts
import { ClientRepository } from '../../core/interfaces/ClientRepository';
import fs from 'fs';
import path from 'path';
import prisma from "../../config/database";


export class ClientRepositoryImpl {

  async getAllClients (): Promise<void> {
    try {
      
      return await prisma.$queryRawUnsafe(`
        SELECT * FROM clients
        WHERE deleted_at IS NULL;
      `);

    } catch (error) {
      console.error("Error al obtener vehículos disponibles:", error);
      throw error;
    } 
  }

  async findOrCreateClient(name: string, document: string): Promise<number> {
    try {
      const existingClient: any = await prisma.$queryRawUnsafe(
        `SELECT id FROM clients WHERE document = ? LIMIT 1`, 
        document
      );

      if (existingClient.length > 0) {
        return existingClient[0].id;
      }

      const result: any = await prisma.$executeRawUnsafe(`
        INSERT INTO clients (name, document, created_at) VALUES (?, ?, NOW())
      `, name, document);

      return result; 
    } catch (error) {
      console.error('Error al buscar o crear cliente:', error);
      throw error;
    }
  }

  async loadClients(): Promise<void> {
    try {
      const filePath = path.join(__dirname, '../../infrastructure/data/clients.json');

      if (!fs.existsSync(filePath)) {
        throw new Error('El archivo clients.json no existe');
      }

      const fileContent = fs.readFileSync(filePath, 'utf-8');

      if (!fileContent.trim()) {
        throw new Error('El archivo clients.json está vacío');
      }

      const data = JSON.parse(fileContent);

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No se encontraron clientes en el archivo clients.json');
      }

      await Promise.all(
        data.map(async (client: any) => {
          await this.findOrCreateClient(client.nombre, client.documento);
        })
      );

    } catch (error) {
      console.error('Error al cargar clientes:', error);
      throw error;
    }
  }
}