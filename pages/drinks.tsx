import React from "react";
import { Drinks } from "../components/Drinks";

import { debounce, TextField } from "@mui/material";
const recipes = require("../data/recipes.json");

import styles from "../styles/Home.module.css";
import Head from "next/head";
import { Alerts } from "../components/Alerts";
import { faN } from "@fortawesome/free-solid-svg-icons";
const DrinlsRecipe = () => {
  const [filterRecipes, setFilterRecipes] = React.useState("");

  const resultRecipes = recipes.filter((item: any) => {
    return item?.name
      ?.toLowerCase()
      .includes(filterRecipes.toLocaleLowerCase());
  });

  const debounce = React.useCallback(
    (fn: any, delay: number) => {
      let timeId: any;

      return (...args: any) => {
        if (timeId) clearTimeout(timeId);

        timeId = setTimeout(() => {
          fn(...args);
        }, delay);
      };
    },
    [filterRecipes]
  );

  const handelInput = debounce(
    (e: any) => setFilterRecipes(e.target.value),
    200
  );

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
          onChange={handelInput}
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
