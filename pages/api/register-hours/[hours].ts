import { connectDatabase, insertDocument } from "../../../helper/db-util";

async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const payload = req.body;

    const { hours: userId } = req.query;

    const date = new Date();
    // let input = { ...payload, userId, date } as any;
    // console.log(input);

    const input = {
      userId: {
        userId,
      },
      salse: {
        productSales: payload.productSales,
        other: payload.other,
      },
      payments: {
        card28: payload.card28,
        card43: payload.card43,
      },
      countCoins: {
        "20s": +payload["20s"] * 20,
        "10s": +payload["10s"] * 10,
        "5s": +payload["5s"] * 5,
        "2s": +payload["2s"] * 2,
        "1s": +payload["1s"] * 1,
      },
      countNote: {
        "1000s": +payload["1000s"] * 1000,
        "500s": +payload["500s"] * 500,
        "200s": +payload["200s"] * 200,
        "100s": +payload["100s"] * 100,
        "50s": +payload["50s"] * 50,
      },
      comments: {
        comments: payload.comments,
      },
      date: {
        date,
      },
    };
    console.log(input);

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Failed to connect to db!" });
      return;
    }

    try {
      await insertDocument(client, "cash-register", input);
      res.status(201).json({ message: "Signed Up!" });
    } catch (error) {
      res.status(500).json({ message: "Failed to insert to db!" });
      return;
    }

    client.close();
  }
}

export default handler;
