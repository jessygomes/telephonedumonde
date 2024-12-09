import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seed = async () => {
    try {
      const phoneModels = await prisma.phoneModel.createMany({
        data: [
          {
            name: 'iPhone 13',
            brand: 'Apple',
            isActive: true,
          },
          {
            name: 'iPhone 16',
            brand: 'Apple',
            isActive: true,
          },
        ],
      });
  
      console.log('Téléphones insérés avec succès :', phoneModels);
    } catch (error) {
      console.error('Erreur lors de l\'insertion des téléphones :', error);
    } finally {
      await prisma.$disconnect();
    }
  };