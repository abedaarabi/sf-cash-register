// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const payload = req.body;

  const employee = {
    id: payload.employeeId as string,
    displayName: payload.displayName as string,
  };

  const report = {
    employeId: payload.employeeId as any,
    reportId: payload.reportId as string,
    update_by: payload.displayName as string,
    close_by: payload.displayName as any,
    card_28: payload.card28 || (0 as number),
    card_43: payload.card43 || (0 as number),
    mobile_pay: payload.mobilePay || (0 as number),
    invoices: payload.invoices || (0 as number),
    one_thousand_kr: payload["1000s"] * 1000 || (0 as number),
    five_hundred_kr: payload["500s"] * 500 || (0 as number),
    two_hundred_kr: payload["200s"] * 200 || (0 as number),
    one_hundred_kr: payload["100s"] * 100 || (0 as number),
    fifty_kr: payload["50s"] * 50 || (0 as number),
    twenty_kr: payload["20s"] * 20 || (0 as number),
    ten_kr: payload["10s"] * 10 || (0 as number),
    five_kr: payload["5s"] * 5 || (0 as number),
    two_kr: payload["2s"] * 2 || (0 as number),
    one_kr: payload["1s"] * 1 || (0 as number),
    half_kr: payload["half"] * 0.5 || (0 as number),
    comments: payload.comments as string,
    productSales: payload.productSales || (0 as number),
    other: payload.other || (0 as number),
    closingDate: new Date(payload.closingDate).toLocaleDateString() as string,
    Date: new Date().toLocaleDateString() as string,
    Time: new Date().toLocaleTimeString() as string,
    cashOut: payload.cashOut || (0 as number),
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
        res.status(200).json({ message: "Data Added successfully!" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Data Error!" });
    }
  }

  if (req.method === "GET") {
    const { startDte, endDate } = req.query;

    const start = new Date(startDte as any).toLocaleDateString();
    const end = new Date(endDate as any).toLocaleDateString();

    console.log(start, end);
    try {
      const data = await prisma.dailyReport.findMany({
        where: {
          closingDate: {
            lt: start,
            gte: "01/02/2022" as any,
          },
        },
      });

      res
        .status(200)
        .json({ message: "Data Fetched successfully!", response: data });
    } catch (error) {}
  }
}

function addDays(days: any) {
  var n = 5; //number of days to add.
  var today = new Date(); //Today's Date
  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - days
  ).toLocaleDateString();
}
// function addDays(theDate: any, days: any) {
//   return new Date(theDate.getTime() - days * 24 * 60 * 60 * 1000).toLocaleDateString();
// }
