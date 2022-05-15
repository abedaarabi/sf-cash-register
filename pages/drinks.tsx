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

  const handelOnChange = debounce((text: any) => {
    setFilterRecipes(text);
  }, 200);

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
          // value={filterRecipes}
          onChange={(e: any) => handelOnChange(e.target.value)}
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

const debounce = (cb: any, delay: number) => {
  let time: any;

  return (...args: any) => {
    if (time) clearTimeout(time);
    setTimeout(() => {
      cb(...args);
    }, delay);
  };
};
