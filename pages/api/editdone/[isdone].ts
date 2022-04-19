import {
  connectDatabase,
  getAllDocuments,
  updateDocument,
} from "../../../helper/db-util";
const ObjectID = require("mongodb").ObjectID;

async function handler(req: any, res: any) {
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Failed to connect to db!" });
    return;
  }
  if (req.method === "POST") {
    const { done, id } = req.body;
    console.log(done, id);

    try {
      const result = await updateDocument(
        client,
        "cash-register",
        { _id: ObjectID(id) },
        { $set: { done } }
      );
      res
        .status(200)
        .json({ message: "Document Updated successfully!", result });
    } catch (error) {}
  }
}

export default handler;
