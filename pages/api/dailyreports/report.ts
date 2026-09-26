import type { NextApiRequest, NextApiResponse } from "next";

import {
  getDefaultClosingDateRange,
  isValidClosingDateRange,
  normalizeClosingDateParam,
} from "../../../helper/closingDateRange";
import { prisma } from "../../../lib/prisma";

function buildReportFromPayload(payload: Record<string, unknown>) {
  return {
    employeId: payload.employeeId as string,
    reportId: payload.reportId as string,
    update_by: payload.displayName as string,
    close_by: payload.displayName as string,
    card_28: (payload.card28 as number) || 0,
    card_43: (payload.card43 as number) || 0,
    mobile_pay: (payload.mobilePay as number) || 0,
    invoices: (payload.invoices as number) || 0,
    one_thousand_kr: (Number(payload["1000s"]) || 0) * 1000,
    five_hundred_kr: (Number(payload["500s"]) || 0) * 500,
    two_hundred_kr: (Number(payload["200s"]) || 0) * 200,
    one_hundred_kr: (Number(payload["100s"]) || 0) * 100,
    fifty_kr: (Number(payload["50s"]) || 0) * 50,
    twenty_kr: (Number(payload["20s"]) || 0) * 20,
    ten_kr: (Number(payload["10s"]) || 0) * 10,
    five_kr: (Number(payload["5s"]) || 0) * 5,
    two_kr: (Number(payload["2s"]) || 0) * 2,
    one_kr: (Number(payload["1s"]) || 0) * 1,
    half_kr: (Number(payload.half) || 0) * 0.5,
    comments: payload.comments as string,
    productSales: (payload.productSales as number) || 0,
    other: (payload.other as number) || 0,
    closingDate: payload.closingDate as string,
    Date: new Date().toLocaleDateString(),
    Time: new Date().toLocaleTimeString(),
    cashOut: (payload.cashOut as number) || 0,
    reason: payload.reason as string,
  };
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const startDate = normalizeClosingDateParam(
    req.query.startDate as string | undefined
  );
  const endDate = normalizeClosingDateParam(
    req.query.endDate as string | undefined
  );

  try {
    let data;
    if (id) {
      data = await prisma.dailyReport.findMany({
        where: { id: +String(id) },
      });
    } else if (!startDate && !endDate) {
      const { startDate: defaultStart, endDate: defaultEnd } =
        getDefaultClosingDateRange();
      data = await prisma.dailyReport.findMany({
        where: {
          closingDate: {
            gte: defaultStart,
            lte: defaultEnd,
          },
        },
        orderBy: { closingDate: "asc" },
      });
    } else if (!isValidClosingDateRange(startDate, endDate)) {
      res.status(400).json({
        message:
          "Invalid date range. Use YYYY-MM-DD for both startDate and endDate.",
      });
      return;
    } else {
      data = await prisma.dailyReport.findMany({
        where: {
          closingDate: {
            gte: startDate,
            lte: endDate,
          },
        },
        orderBy: { closingDate: "asc" },
      });
    }

    res.status(200).json({ message: "Data Fetched successfully!", response: data });
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : "Unknown database error";
    res.status(500).json({
      message: "Failed to fetch data from database.",
      error: message,
    });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const payload = (req.body ?? {}) as Record<string, unknown>;
  const employee = {
    id: payload.employeeId as string,
    displayName: payload.displayName as string,
  };
  const report = buildReportFromPayload(payload);

  try {
    if (!payload.id) {
      try {
        await prisma.employe.create({ data: employee });
      } catch (error) {
        console.log(error);
      }

      await prisma.dailyReport.create({
        //@ts-ignore
        data: report,
      });
      res.status(201).json({ message: "Data Added successfully!" });
    } else {
      const { close_by: _closeBy, employeId: _employeId, ...acceptedObj } =
        report;

      await prisma.dailyReport.update({
        where: { id: Number(payload.id) },
        //@ts-ignore
        data: acceptedObj,
      });
      res.status(200).json({ message: "Data Added successfully!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Data Error!" });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    return handleGet(req, res);
  }

  if (req.method === "POST") {
    return handlePost(req, res);
  }

  res.status(405).json({ message: "Method not allowed" });
}
