import React from "react";
import { Drinks } from "../components/Drinks";

import { CircularProgress, debounce, TextField } from "@mui/material";
const recipes = require("../data/recipes.json");

import styles from "../styles/Home.module.css";
import Head from "next/head";
import { Alerts } from "../components/Alerts";
import { useQuery } from "react-query";
import { Button } from "../components/ui/Button";
import { admin } from "../helper/emailAdmin";
import { useAuth } from "../context/AuthContext";

const getDrinks = async () => {
  return await (await fetch("api/drinks/drink")).json();
};

const DrinlsRecipe = () => {
  const { user } = useAuth();
  const { isLoading, isError, data, error } = useQuery("drinks", getDrinks);

  const [filterRecipes, setFilterRecipes] = React.useState("");
  console.log(data.response);

  const resultRecipes =
    data &&
    data?.response.filter((item: any) => {
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

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

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

        {admin.includes(user?.email) && (
          <div style={{ marginTop: "1rem" }}>
            <Button
              href={{
                pathname: `/drinkspanel`,
              }}
            >
              Add new Drink
            </Button>
          </div>
        )}
      </div>
      <div className={styles.recipes}>
        {resultRecipes.length === 0 ? (
          <Alerts severity="info" msg="Drink is not found" />
        ) : (
          resultRecipes.map((recipe: any) => (
            <div key={recipe.id} className={styles.recipesCard}>
              <Drinks
                id={recipe.id}
                name={recipe.name}
                img={recipe.image}
                description={recipe.description}
                prise={recipe.price}
                recipe={recipe.recipe}
                preparation={recipe.preparation}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DrinlsRecipe;
