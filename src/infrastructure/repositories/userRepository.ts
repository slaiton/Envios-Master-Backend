import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      id_client: true,
      id_rol: true,
      password: true,
    },
  });
};

export const createUser = async (name: string, email: string, password: string) => {
  return await prisma.user.create({
    data: { name, email, password },
  });
};