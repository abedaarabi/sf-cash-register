// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    try {
      const result = await prisma.dailyReport.findMany();
      return res.status(200).json(result);
    } catch (error) {}
  }
}
