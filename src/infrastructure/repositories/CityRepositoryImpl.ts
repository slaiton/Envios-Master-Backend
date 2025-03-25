// src/infrastructure/repositories/CityRepositoryImpl.ts
import { CityRepository } from '../../core/interfaces/CityRepository';
import fs from 'fs';
import path from 'path';
import prisma from "../../config/database";
import { City } from '../../core/entities/City';


export class CityRepositoryImpl {

  async getAllCities(): Promise<City[]> {
    const cities = await prisma.$queryRaw<{ id: number; name: string, departament: string, prefix: string }[]>`
        SELECT id, name, code_dane, departament, prefix FROM cities;
    `;

    return cities.map((city:any) => new City(city.id, city.name, city.departament, city.prefix));
  }

  async getCityById(id: number): Promise<City | null> {
    const result = await prisma.$queryRaw<{ id: number; name: string, departament: string, prefix: string }[]>`
      SELECT * FROM cities WHERE id = ${id}
    `;

    return result.length > 0 ? result[0] : null;
  }


  async findOrCreateCity(name: string, codeDane: string, departament: string, prefix: string): Promise<number> {
    try {
      const existingCity: any = await prisma.$queryRawUnsafe(
        `SELECT id FROM cities WHERE name = ? AND code_dane = ? LIMIT 1`,
        name, codeDane
      );

      if (existingCity.length > 0) {
        return existingCity[0].id;
      }

      const result: any = await prisma.$executeRawUnsafe(`
        INSERT INTO cities (name, code_dane, departament, prefix, id_country) VALUES (?, ?, ?, ?, 1);
      `, name, codeDane, departament, prefix);

      return result;
    } catch (error) {
      console.error('Error al buscar o crear ciudad:', error);
      throw error;
    }
  }

  async loadCities(): Promise<void> {
    try {
      const filePath = path.join(__dirname, '../../infrastructure/data/cities.json');

      if (!fs.existsSync(filePath)) {
        throw new Error('El archivo cities.json no existe');
      }

      const fileContent = fs.readFileSync(filePath, 'utf-8');

      if (!fileContent.trim()) {
        throw new Error('El archivo cities.json está vacío');
      }

      const data = JSON.parse(fileContent);

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No se encontraron ciudades en el archivo cities.json');
      }

      await Promise.all(
        data.map(async (city: any) => {
          await this.findOrCreateCity(city.nombre, city.dane, city.departamento, city.prefijo);
        })
      );

    } catch (error) {
      console.error('Error al cargar ciudades:', error);
      throw error;
    }
  }
}