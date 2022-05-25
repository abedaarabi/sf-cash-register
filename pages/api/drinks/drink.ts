import { async } from "@firebase/util";

import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../lib/prisma";

// import { PrismaClient } from "@prisma/client";
import { uuid } from "uuidv4";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // const prisma = new PrismaClient();
  const { recipes, inputsValue } = req.body;
  const { id } = req.body;

  const drinkId = uuid();

  if (req.method === "DELETE") {
    const { id } = req.body;

    try {
      console.log(id);
      const data = await prisma.drinks.delete({ where: { id } });
      res.status(201).json({ message: "Drink Deleted successfully!", data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Data Error!" });
    }
  }
  if (req.method === "POST") {
    const allRecipes = JSON.stringify(recipes.map((item: any) => item.rRecipe));

    const drink = {
      id: drinkId,
      image: inputsValue.image as string,
      name: inputsValue.name as string,
      recipe: allRecipes as string,
      description: inputsValue.description as string,
      price: +inputsValue.price as number,
      preparation: inputsValue.preparation as string,
    };

    try {
      if (!id) {
        await prisma.drinks.create({
          data: {
            ...drink,
          },
        });
      } else {
        await prisma.drinks.update({
          where: {
            id: id,
          },
          data: {
            ...drink,
          },
        });
      }

      res.status(201).json({ message: "Data Added successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Data Error!" });
    }
  }

  if (req.method === "GET") {
    try {
      const data = await prisma.drinks.findMany();

      res
        .status(201)
        .json({ message: "Data Added successfully!", response: data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Data Error!" });
    }
  }
}
