import TextField from "@mui/material/TextField";
import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Alerts } from "./Alerts";
import { Button } from "./ui/Button";
import { SectionCard } from "./ui/Card";
import { PageHeader } from "./ui/PageHeader";
import { PageLoader, Spinner } from "./ui/Loading";
import {
  IconCocktail,
  IconImage,
  IconMinus,
  IconNote,
  IconPlus,
  IconTag,
} from "./ui/icons";

interface Inputs {
  image: string;
  price: number;
  description: string;
  name: string;
  preparation: string;
}

export const DrinkPanel = () => {
  const router = useRouter();
  const { id } = router.query;

  const getDrinkByID = async () => {
    return await (await fetch("api/drinks/drink")).json();
  };
  const { isLoading, data } = useQuery("drinks", getDrinkByID);

  const [recipes, setRecipes] = React.useState([{ rRecipe: "" }]) as any;
  const [addReport, setAddReport] = React.useState(null) as any;
  const [isAddReport, setIsAddReport] = React.useState(false) as any;

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

    id && setRecipes(rRecipes);

    id &&
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

  if (isLoading || !data) {
    return <PageLoader label="Loading drink…" />;
  }

  return (
    <div className="app-shell">
      <PageHeader
        title={id ? "Edit drink" : "Add a new drink"}
        subtitle="Photo, description, recipe steps and price"
        icon={<IconCocktail className="h-5 w-5" />}
      />

      <form onSubmit={addDrink} className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-2">
          <SectionCard
            title="Details"
            icon={<IconTag className="h-4 w-4" />}
            bodyClassName="space-y-4"
          >
            <TextField
              placeholder="https://…"
              label="Image URL"
              size="small"
              fullWidth
              value={inputsValue.image}
              onChange={(event: any) => {
                setInputsValue({ ...inputsValue, image: event.target.value });
              }}
            />
            <div className="flex h-36 items-center justify-center overflow-hidden rounded-xl border border-line bg-surface-sunken">
              {inputsValue.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={inputsValue.image}
                  alt={inputsValue.name || "Drink preview"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="flex flex-col items-center gap-1 text-ink-subtle">
                  <IconImage className="h-7 w-7" />
                  <span className="text-xs font-medium">Image preview</span>
                </span>
              )}
            </div>
            <TextField
              placeholder="Name"
              label="Name"
              size="small"
              fullWidth
              value={inputsValue.name}
              onChange={(event: any) => {
                setInputsValue({ ...inputsValue, name: event.target.value });
              }}
            />
            <TextField
              placeholder="Short description of the drink"
              label="Description"
              rows={4}
              multiline
              fullWidth
              value={inputsValue.description}
              onChange={(event: any) => {
                setInputsValue({
                  ...inputsValue,
                  description: event.target.value,
                });
              }}
            />
            <TextField
              placeholder="Price"
              label="Price (kr)"
              type={"number"}
              size="small"
              fullWidth
              value={inputsValue.price}
              onChange={(event: any) => {
                setInputsValue({
                  ...inputsValue,
                  price: event.target.value,
                });
              }}
            />
          </SectionCard>

          <SectionCard
            title="Recipe"
            icon={<IconNote className="h-4 w-4" />}
            bodyClassName="space-y-4"
          >
            <div className="space-y-3">
              {recipes &&
                recipes.map((item: any, index: any) => (
                  <div key={index} className="flex items-center gap-2">
                    <TextField
                      placeholder={item.rRecipe}
                      label={"Recipe  " + Number(index + 1)}
                      name={"rRecipe"}
                      size="small"
                      fullWidth
                      value={item.rRecipe}
                      onChange={(event: any) => {
                        handleInput(event, index);
                      }}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="!px-2"
                      aria-label={`Remove step ${index + 1}`}
                      onClick={() => removeField(index)}
                    >
                      <IconMinus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
            </div>

            <Button
              type="button"
              variant="subtle"
              size="sm"
              icon={<IconPlus className="h-4 w-4" />}
              onClick={addField}
            >
              Add step
            </Button>

            <TextField
              placeholder="How is it prepared?"
              label="Preparation"
              rows={5}
              multiline
              fullWidth
              value={inputsValue.preparation}
              onChange={(event: any) => {
                setInputsValue({
                  ...inputsValue,
                  preparation: event.target.value,
                });
              }}
            />
          </SectionCard>
        </div>

        {addReport && (
          <Alerts
            msg={addReport}
            severity={
              addReport === "Data Added successfully!" ? "success" : "error"
            }
          />
        )}

        <div className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            disabled={isAddReport}
            icon={
              isAddReport ? (
                <Spinner className="h-4 w-4 border-white/40 border-t-white" />
              ) : null
            }
          >
            {isAddReport ? "Saving…" : id ? "Save drink" : "Add drink"}
          </Button>
        </div>
      </form>
    </div>
  );
};
