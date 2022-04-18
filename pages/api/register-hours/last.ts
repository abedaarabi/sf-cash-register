import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../helper/db-util";

// async function handler(req: any, res: any) {
//   const { hours: userId } = req.query;
//   const date = new Date();
//   let client;
//   try {
//     client = await connectDatabase();
//   } catch (error) {
//     res.status(500).json({ message: "Failed to connect to db!" });
//     return;
//   }

//   if (req.method === "GET") {
//     try {
//       const documents = await getAllDocuments(client, "cash-register");

//       res.status(200).json({ response: documents });
//     } catch (error) {
//       res.status(500).json({ message: "Getting data failed" });
//     }
//   }
//   client.close();
// }

// export default handler;
