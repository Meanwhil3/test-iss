// import { PrismaClient } from '@prisma/client'

// const prismaClientSingleton = () => {
//   return new PrismaClient({
//     datasources: {
//       db: {
//         url: 'file:./database/dev.db',
//       },
//     },
//     log: ['query', 'info', 'warn', 'error'],
//     errorFormat: 'pretty',
//   }).$extends({
//     query: {
//       $allOperations({ operation, model, args, query }) {
//         const start = performance.now()
//         return query(args).then((result) => {
//           const end = performance.now()
//           console.log(`${operation} on ${model} took ${end - start}ms`)
//           return result
//         })
//       },
//     },
//   }).$extends({
//     client: {
//       $allOperations: ({ operation, model, args, query }) => {
//         return query(args, { timeout: 60000 }) // 60 seconds timeout
//       },
//     },
//   })
// }

// type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClientSingleton | undefined
// }

// const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

// export default prisma

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma