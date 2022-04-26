// import { prisma } from "../lib/prisma";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient() as any;

import { dailyReports } from "./dailyReports";

async function main() {
  await prisma.dailyReport.create({
    data: {},
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
