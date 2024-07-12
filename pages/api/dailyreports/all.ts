import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    try {
      const data = await prisma.dailyReport.findMany({});

      res
        .status(200)
        .json({ message: "Data Fetched successfully!", response: data });
    } catch (error) {
      return error;
    }
  }
}
