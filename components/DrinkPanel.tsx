import { Button, CircularProgress, TextField } from "@mui/material";
import React from "react";
import { Interface } from "readline";
import { Alerts } from "./Alerts";
import { MyField } from "./MyField";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

interface Inputs {
  image: string;
  price: number;
  description: string;
  name: string;
  preparation: string;
}

export const DrinkPanel = () => {
  const [drinkById, setDrinkById] = React.useState() as any;
  const router = useRouter();
  const { id } = router.query;

  const getDrinkByID = async () => {
    return await (await fetch("api/drinks/drink")).json();
  };
  const { isLoading, isError, data, error, status } = useQuery(
    "drinks",
    getDrinkByID
  );

  const [addReport, setAddReport] = React.useState(null) as any;
  const [isAddReport, setIsAddReport] = React.useState(false) as any;
  const [recipes, setRecipes] = React.useState([{ rRecipe: "" }]) as any;

  const [inputsValue, setInputsValue] = React.useState({
    image: "",
    price: 0,
    description: "",
    name: "",
    preparation: "",
  } as Inputs);

  React.useEffect(() => {
    const result = data?.response.find((drinkId: any) => drinkId.id === id);
    const allRecipe = result && JSON.parse(result?.recipe);

    const rRecipes = allRecipe?.map((item: string) => {
      return { rRecipe: item };
    });

    setRecipes(rRecipes);

    setInputsValue({
      image: result?.image || "",
      price: result?.price || 0,
      description: result?.description || "",
      name: result?.name || "",
      preparation: result?.preparation || "",
    });
  }, [isLoading]);

  const addField = () => {
    let newRecipe = {
      rRecipe: "",
    };
    setRecipes([...recipes, newRecipe]);
  };

  const removeField = (index: number) => {
    if (recipes.length <= 1) return;

    const removedField = [...recipes];

    removedField.splice(index, 1);

    setRecipes(removedField);
  };

  const handleInput = (event: any, index: number) => {
    const addedInput = [...recipes];

    addedInput[index][event.target.name] = event.target.value;
    setRecipes(addedInput);
  };

  async function addDrinksDataBase() {
    return await fetch("/api/drinks/drink/", {
      method: "POST",
      body: JSON.stringify({
        id,
        recipes,
        inputsValue,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())

      .catch((error) => console.error(error));
  }

  const addDrink = async (e: any) => {
    e.preventDefault();
    if (inputsValue.name === "") {
      alert("fill the inputs");
    } else {
      setIsAddReport(true);
      const response = await addDrinksDataBase();

      setAddReport(response.message);
      setIsAddReport(false);
    }
  };

  React.useEffect(() => {
    let time = setTimeout(() => {
      if (addReport === "Data Added successfully!") {
        setInputsValue({
          image: "",
          price: 0,
          description: "",
          name: "",
          preparation: "",
        });
        setRecipes([{ rRecipe: "" }]);
      }
      setAddReport(null);
    }, 1000);

    return () => clearTimeout(time);
  }, [isAddReport, addReport]);

  return (
    <div
      style={{
        display: "flex",
        marginTop: "1rem",
        marginBottom: "4rem",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "column",
        marginLeft: "2rem",
      }}
    >
      <form onSubmit={addDrink}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            justifyContent: "space-between",
          }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <TextField
              placeholder="Image"
              label="Image"
              margin="dense"
              value={inputsValue.image}
              onChange={(event: any) => {
                setInputsValue({ ...inputsValue, image: event.target.value });
              }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <TextField
              placeholder="Name"
              label="Name"
              value={inputsValue.name}
              onChange={(event: any) => {
                setInputsValue({ ...inputsValue, name: event.target.value });
              }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <TextField
              placeholder="Description"
              label="Description"
              rows={5}
              multiline
              style={{ width: "25rem" }}
              value={inputsValue.description}
              onChange={(event: any) => {
                setInputsValue({
                  ...inputsValue,
                  description: event.target.value,
                });
              }}
            />
          </div>

          <div>
            <h3>Recipes:</h3>

            {recipes &&
              recipes.map((item: any, index: any) => {
                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      marginBottom: "0.8rem",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      placeholder={item.rRecipe}
                      label={"Recipe  " + Number(index + 1)}
                      name={"rRecipe"}
                      value={item.rRecipe}
                      onChange={(event: any) => {
                        handleInput(event, index);
                      }}
                    />

                    <div>
                      <Button onClick={addField}>+</Button>
                      <Button onClick={() => removeField(index)}>-</Button>
                    </div>
                  </div>
                );
              })}
            <div style={{ marginBottom: "1rem" }}>
              <TextField
                placeholder="Preparation"
                label="Preparation"
                rows={5}
                multiline
                style={{ width: "25rem" }}
                value={inputsValue.preparation}
                onChange={(event: any) => {
                  setInputsValue({
                    ...inputsValue,
                    preparation: event.target.value,
                  });
                }}
              />
            </div>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <TextField
              placeholder="Price"
              label="Price"
              type={"number"}
              value={inputsValue.price}
              onChange={(event: any) => {
                setInputsValue({
                  ...inputsValue,
                  price: event.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className={styles.alert}>
          {addReport && (
            <Alerts
              msg={addReport}
              severity={
                addReport === "Data Added successfully!" ? "success" : "error"
              }
            />
          )}
          <div style={{ margin: "10px 240px" }}>
            {isAddReport && <CircularProgress />}
          </div>
        </div>
        <div style={{ marginLeft: "6rem" }}>
          <Button type="submit"> Add Drink</Button>
        </div>
      </form>
    </div>
  );
};
