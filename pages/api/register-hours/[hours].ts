import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
  updateDocument,
} from "../../../helper/db-util";
import { uuid } from "uuidv4";
const ObjectID = require("mongodb").ObjectID;
async function handler(req: any, res: any) {
  const { hours: userId } = req.query;
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  const postId = uuid();

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Failed to connect to db!" });
    return;
  }
  // return;
  // if (req.method === "POST") {
  //   const payload = req.body;

  //   const input = {
  //     userId,
  //     done: false,
  //     closedBy: payload.closedBy,
  //     date,
  //     time,
  //     cashOut: { amount: +payload.cashOut, reason: payload.reason },
  //     closingDate: payload.closingDate,
  //     sales: {
  //       productSales: payload.productSales,
  //       other: payload.other,
  //     },
  //     payments: {
  //       card28: payload.card28,
  //       card43: payload.card43,
  //       mobilePay: payload.mobilePay,
  //       invoices: payload.invoices,
  //     },
  //     countCoins: {
  //       "20s": +payload["20s"] * 20,
  //       "10s": +payload["10s"] * 10,
  //       "5s": +payload["5s"] * 5,
  //       "2s": +payload["2s"] * 2,
  //       "1s": +payload["1s"] * 1,
  //       half: +payload.half * 0.5,
  //     },
  //     countNote: {
  //       "1000s": +payload["1000s"] * 1000,
  //       "500s": +payload["500s"] * 500,
  //       "200s": +payload["200s"] * 200,
  //       "100s": +payload["100s"] * 100,
  //       "50s": +payload["50s"] * 50,
  //     },
  //     comments: payload.comments,
  //   };

  //   try {
  //     if (!payload.id) {
  //       await insertDocument(client, "cash-register", input);
  //       res.status(201).json({ message: "Signed Up!" });
  //     } else {
  //       const { id } = payload;

  //       const result = await updateDocument(
  //         client,
  //         "cash-register",
  //         { _id: ObjectID(id) },
  //         { $set: input }
  //       );

  //       res
  //         .status(200)
  //         .json({ message: "Document Updated successfully!", result });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ message: "Failed to insert to db!" });
  //     return;
  //   }

  //   client.close();
  // }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(client, "cash-register");

      res.status(200).json({ response: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting data failed" });
    }
    client.close();
  }
}

export default handler;
