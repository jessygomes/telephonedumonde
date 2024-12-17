import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seed = async () => {
  try {
    const phoneModels = await prisma.phoneModel.createMany({
      data: [
        {
          name: 'iPhone 16',
          brand: 'Apple',
          isActive: true,
        },
      ],
    });

  } catch (error) {
    console.error('Erreur', error);
  } finally {
    await prisma.$disconnect();
  }
};

seed();