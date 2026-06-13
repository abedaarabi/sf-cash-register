import type { NextApiRequest, NextApiResponse } from "next";

import { getDatabaseHost, getDatabaseUrl } from "../../../lib/db-env";
import { getPrismaClient } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    getDatabaseUrl();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "DATABASE_URL is not set.";

    return res.status(500).json({
      ok: false,
      message,
    });
  }

  try {
    const prisma = getPrismaClient();
    await prisma.$queryRaw`SELECT 1`;
    return res.status(200).json({
      ok: true,
      message: "Database connection successful.",
      host: getDatabaseHost(),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown database error";

    console.error("Database health check failed:", error);

    return res.status(500).json({
      ok: false,
      message,
      host: getDatabaseHost(),
      hint:
        "On Dokploy use the MySQL service hostname (not localhost) and remove ssl-mode unless SSL is enabled.",
    });
  }
}
