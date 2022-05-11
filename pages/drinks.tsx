import React from "react";
import { Drinks } from "../components/Drinks";

import { TextField } from "@mui/material";
const recipes = require("../data/recipes.json");

import styles from "../styles/Home.module.css";
import Head from "next/head";
import { Alerts } from "../components/Alerts";
const DrinlsRecipe = () => {
  const [filterRecipes, setFilterRecipes] = React.useState("");

  const resultRecipes = recipes.filter((item: any) => {
    return item?.name
      ?.toLowerCase()
      .includes(filterRecipes.toLocaleLowerCase());
  });

  return (
    <div>
      <Head>
        <title>Drinks</title>
      </Head>
      <div className={styles.recipesSearsh}>
        <TextField
          id="standard-basic"
          label="Search For Drink"
          variant="standard"
          value={filterRecipes}
          onChange={(e: any) => setFilterRecipes(e.target.value)}
        />
      </div>
      <div className={styles.recipes}>
        {resultRecipes.length === 0 ? (
          <Alerts severity="info" msg="Drink is not found" />
        ) : (
          resultRecipes.map((recipe: any) => (
            <div key={recipe.id} className={styles.recipesCard}>
              <Drinks
                name={recipe.name}
                img={recipe.img}
                description={recipe.description}
                prise={recipe.prise}
                recipe={recipe.recipe}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DrinlsRecipe;
