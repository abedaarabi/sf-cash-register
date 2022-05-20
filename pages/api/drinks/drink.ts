import { async } from "@firebase/util";

import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../lib/prisma";
import { uuid } from "uuidv4";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { recipes, inputsValue } = req.body;
  const drinkId = uuid();
  console.log(req.query);
  if (req.method === "POST") {
    const allRecipes = JSON.stringify(recipes.map((item: any) => item.rRecipe));

    const drink = {
      id: drinkId,
      image: inputsValue.image as string,
      name: inputsValue.name as string,
      recipe: allRecipes as string,
      description: inputsValue.description as string,
      price: +inputsValue.price as number,
    };
    console.log(drink);

    try {
      await prisma.drinks.create({
        data: {
          ...drink,
        },
      });

      res.status(201).json({ message: "Data Added successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Data Error!" });
    }
  }
}
