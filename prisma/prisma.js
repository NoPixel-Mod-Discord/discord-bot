const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getAllStreamers() {
  const streamers = await prisma.streamer.findMany();
  console.log(streamers);
}

getAllStreamers()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  })