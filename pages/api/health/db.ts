import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);

  if (!hasDatabaseUrl) {
    return res.status(500).json({
      ok: false,
      message: "DATABASE_URL is not set in environment variables.",
    });
  }

  try {
    await prisma.$queryRaw`SELECT 1`;
    return res.status(200).json({
      ok: true,
      message: "Database connection successful.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown database error";

    console.error("Database health check failed:", error);

    return res.status(500).json({
      ok: false,
      message,
      hint: "Check Netlify env vars and DigitalOcean trusted sources (firewall).",
    });
  }
}
