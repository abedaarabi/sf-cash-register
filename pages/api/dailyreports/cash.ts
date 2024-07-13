import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    try {
      const data = await prisma.dailyReport.findMany({
        where: { cashOut: { not: "0" } },
        select: {
          cashOut: true,
          reason: true,
          Date: true,
          closingDate: true,
          comments: true,
        },
      });

      res.status(200).json({
        message: "Data Fetched successfully!",
        response: [
          ...data,
          {
            cashOut: "15000",
            reason: "Abbas",
            Date: "7/11/2024",
            closingDate: "2024-07-10",
            comments: "",
          },
          {
            cashOut: "250",
            reason: "Katrine",
            Date: "6/11/2024",
            closingDate: "2024-07-10",
            comments: "",
          },
          {
            cashOut: "300",
            reason: "Abed",
            Date: "6/10/2024",
            closingDate: "2024-07-10",
            comments: "",
          },
        ],
      });
    } catch (error) {
      return error;
    }
  }
}
