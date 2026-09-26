import React from "react";
import Head from "next/head";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useQuery } from "react-query";
import { Drinks } from "../components/Drinks";
import { Alerts } from "../components/Alerts";
import { Button } from "../components/ui/Button";
import { PageHeader } from "../components/ui/PageHeader";
import { PageLoader } from "../components/ui/Loading";
import { IconCocktail, IconPlus, IconSearch } from "../components/ui/icons";
import { admin } from "../helper/emailAdmin";
import { useAuth } from "../context/AuthContext";

const getDrinks = async () => {
  return await (await fetch("api/drinks/drink")).json();
};

const DrinlsRecipe = () => {
  const { user } = useAuth();
  const { isLoading, data } = useQuery("drinks", getDrinks);

  const [filterRecipes, setFilterRecipes] = React.useState("");

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

  if (isLoading || !data) {
    return <PageLoader label="Loading drinks…" />;
  }

  const canManage =
    admin.includes(user?.email) || user?.email === "yas.kh24@gmail.com";

  return (
    <div className="app-shell">
      <Head>
        <title>Drinks</title>
      </Head>

      <PageHeader
        title="Drinks menu"
        subtitle={`${resultRecipes.length} recipe${
          resultRecipes.length === 1 ? "" : "s"
        } available`}
        icon={<IconCocktail className="h-5 w-5" />}
        actions={
          canManage ? (
            <Button
              icon={<IconPlus className="h-4 w-4" />}
              href={{
                pathname: `/drinkspanel`,
              }}
            >
              Add new drink
            </Button>
          ) : null
        }
      />

      <div className="card mb-6 p-3 sm:p-4">
        <TextField
          label="Search for a drink"
          placeholder="Mojito, Negroni…"
          size="small"
          fullWidth
          onChange={handelInput}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconSearch className="h-5 w-5 text-ink-subtle" />
              </InputAdornment>
            ),
          }}
        />
      </div>

      {resultRecipes.length === 0 ? (
        <Alerts severity="info" msg="Drink is not found" />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {resultRecipes.map((recipe: any) => (
            <Drinks
              key={recipe.id}
              id={recipe.id}
              name={recipe.name}
              img={recipe.image}
              description={recipe.description}
              prise={recipe.price}
              recipe={recipe.recipe}
              preparation={recipe.preparation}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DrinlsRecipe;
