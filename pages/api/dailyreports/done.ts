import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    try {
      await prisma.dailyReport.update({
        where: {
          id: req.body.id,
        },
        data: {
          done: req.body.done,
        },
      });
      res.status(200).json({ message: "Document Updated successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Data Updated Failed!" });
      console.log(error);
    }
  }
}
