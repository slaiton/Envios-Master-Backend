import { ConsecutiveRepository } from "../../core/interfaces/ConsecutiveRepository";
import { Consecutive } from "../../core/entities/Consecutive";
import prisma from "../../config/database";

export class ConsecutiveRepositoryImpl implements ConsecutiveRepository {

  public async generateConsecutive(prefijo: string): Promise<string> {

     const maxValueResult: any = await prisma.$queryRawUnsafe(`
    SELECT IFNULL(MAX(value), 0) + 1 as value
    FROM consecutives 
    WHERE prefix = '${prefijo}';
  `);
  
  const newValue = maxValueResult[0].value;

  await prisma.$queryRawUnsafe(`
    INSERT INTO consecutives (name, prefix, value, created_at)
    VALUES (
      'Orden Entrega',
      '${prefijo}', 
      '${newValue}',
      now()
    );
  `);

    return newValue;
  }

  public async getLastConsecutive(prefijo: string): Promise<string | null> {
    const rows = await prisma.$queryRaw<Consecutive[]>`
      SELECT * FROM consecutives 
      WHERE prefix = '${prefijo}'
      ORDER BY created_at DESC LIMIT 1;
    `;

    if (rows.length === 0) return null;

    const { id, value, fecha, prefix } = rows[0];
    return value;
  }
}