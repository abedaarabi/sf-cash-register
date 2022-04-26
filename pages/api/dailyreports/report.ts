import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../lib/prisma";

// const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const payload = req.body;

  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  const employee = {
    id: payload.employeeId as string,
    displayName: payload.displayName as string,
  };

  const report = {
    employeId: payload.employeeId as any,
    reportId: payload.reportId as string,
    update_by: payload.displayName as string,
    close_by: payload.displayName as any,
    card_28: payload.card28 as number,
    card_43: payload.card43 as number,
    mobile_pay: payload.mobilePay as number,
    invoices: payload.invoices as number,
    one_thousand_kr: (payload["1000s"] * 1000) as number,
    five_hundred_kr: (payload["500s"] * 500) as number,
    two_hundred_kr: (payload["200s"] * 200) as number,
    one_hundred_kr: (payload["100s"] * 100) as number,
    fifty_kr: (payload["50s"] * 50) as number,
    twenty_kr: (payload["20s"] * 20) as number,
    ten_kr: (payload["10s"] * 10) as number,
    five_kr: (payload["5s"] * 5) as number,
    two_kr: (payload["2s"] * 2) as number,
    one_kr: (payload["1s"] * 1) as number,
    half_kr: (payload["half"] * 0.5) as number,
    comments: payload.comments as string,
    productSales: payload.productSales as number,
    other: payload.other as number,
    closingDate: payload.closingDate as string,
    Date: date as string,
    Time: time as string,
    cashOut: payload.cashOut as number,
    reason: payload.reason as string,
  };

  if (req.method === "POST") {
    try {
      if (!payload.id) {
        //insert Employee

        try {
          await prisma.employe.create({
            data: {
              ...employee,
            },
          });
        } catch (error) {}

        //insert Report
        await prisma.dailyReport.create({
          data: {
            ...report,
          },
        });
        res.status(201).json({ message: "Data Added successfully!" });
      } else {
        const acceptedObj = { ...report };
        delete acceptedObj.close_by;
        delete acceptedObj.employeId;

        await prisma.dailyReport.update({
          where: {
            id: payload.id,
          },
          data: {
            ...acceptedObj,
          },
        });
        res.status(200).json({ message: "Data Updated successfully!" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (req.method === "GET") {
    try {
      const data = await prisma.dailyReport.findMany();

      res
        .status(200)
        .json({ message: "Data Added successfully!", response: data });
    } catch (error) {}
  }
}
