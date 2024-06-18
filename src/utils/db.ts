import { PrismaClient, Prisma } from '@prisma/client';

// إنشاء واجهة جديدة بناءً على PrismaClient
interface CustomPrismaClient extends PrismaClient {
  // يمكنك إضافة خصائص أو طرق إضافية هنا إذا لزم الأمر
  myCustomMethod?: () => void;
}

const prismaClientSingleton = (): CustomPrismaClient => {
  const prisma = new PrismaClient() as CustomPrismaClient;
  // يمكنك إضافة طرق مخصصة إلى prisma هنا
  prisma.myCustomMethod = () => {
    console.log('This is a custom method');
  };
  return prisma;
};

globalThis.prismaGlobal = globalThis.prismaGlobal || prismaClientSingleton();

const prisma: CustomPrismaClient = globalThis.prismaGlobal as CustomPrismaClient;

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
