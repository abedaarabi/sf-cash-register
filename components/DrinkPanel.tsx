import { Button, TextField } from "@mui/material";
import React from "react";
import { MyField } from "./MyField";

export const DrinkPanel = () => {
  const [recipes, setRecipes] = React.useState([{ rRecipe: "" }]) as any;
  const [inputsValue, setInputsValue] = React.useState({
    image: "" ,
    price: "",
    description: "",
    name: "",
  });

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
    console.log(addedInput[index], [event.target.name]);

    addedInput[index][event.target.name] = event.target.value;
    setRecipes(addedInput);
  };

  const addDrink = (e: any) => {
    e.preventDefault();
    const v = JSON.stringify(recipes);
    console.log(v, inputsValue);
    console.log(JSON.parse(v));
  };

  return (
    <div
      style={{
        display: "flex",
        marginTop: "1rem",
        marginBottom: "4rem",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "column",
      }}
    >
      <form onSubmit={addDrink}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            justifyContent: "space-around",
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
          <div style={{ marginBottom: "1rem", width: "12rem" }}>
            <TextField
              placeholder="Description"
              label="Description"
              rows={5}
              multiline
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
                console.log(item);

                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      marginBottom: "0.3rem",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      placeholder={item.rRecipe}
                      label={"Recipe  " + index}
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
          </div>

          <div style={{ marginTop: "1rem" }}>
            <TextField
              placeholder="Price"
              label="Price"
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
        <div>
          <Button type="submit">Add Drink</Button>
        </div>
      </form>
    </div>
  );
};
