import * as React from "react";
import Card from "@mui/material/Card";
import { faAngleRight, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Typography from "@mui/material/Typography";

import { useAuth } from "../context/AuthContext";
import styles from "../styles/Home.module.css";
import { Button } from "./ui/Button";
import { admin } from "../helper/emailAdmin";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
export function Drinks({
  img,
  name,
  description,
  prise,
  recipe,
  id,
  preparation,
}: any) {
  const { user } = useAuth();
  const [isHide, setIsHide] = React.useState(false);
  const arrow = isHide ? faAngleDown : faAngleRight;

  const deleteDrinkById = async (id: any) => {
    return await axios.delete("api/drinks/drink", {
      data: {
        id,
      },
    });
  };

  const useDeleteDrink = () => {
    const queryClinet = useQueryClient();
    return useMutation(deleteDrinkById, {
      onSuccess: () => {
        queryClinet.invalidateQueries("drinks");
      },
    });
  };

  const { mutate } = useDeleteDrink();

  const rRecipe = JSON.parse(recipe);

  const deleteDrink = (id: string) => {
    mutate(id);
  };

  return (
    <Card sx={{ maxWidth: 360 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="250"
        width={"350"}
        image={img}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant={"body2"}
          component="div"
          color={"#343a40"}
        >
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" component="div">
          {description}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          marginTop={"1rem"}
          component="div"
        >
          {(admin.includes(user?.email) || "yas.kh24@gmail.com") && (
            <div
              style={{
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Button
                style={{
                  width: "4rem",
                  backgroundColor: "#0077b6",
                }}
                href={{
                  pathname: `/drinkspanel`,
                  query: {
                    id: id,
                  },
                }}
              >
                Edit
              </Button>
              <Button
                style={{
                  width: "4rem",
                  backgroundColor: "#e63946",
                }}
                onClick={() => deleteDrink(id)}
              >
                Delete
              </Button>
            </div>
          )}
          {user && (
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h3 style={{ paddingRight: "5px" }}>Recipe </h3>
                <FontAwesomeIcon
                  className="arrow"
                  icon={arrow}
                  size="lg"
                  color={"#343a40"}
                  onClick={() => {
                    setIsHide(!isHide);
                  }}
                />
              </div>

              {isHide && (
                <div>
                  <ul>
                    {rRecipe?.map((i: string, idx: any) => (
                      <li key={idx}>{i}</li>
                    ))}
                  </ul>
                  <div>
                    <p>Preparation:</p>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="div"
                    >
                      {preparation}
                    </Typography>
                  </div>
                </div>
              )}
            </div>
          )}
        </Typography>

        <Typography
          gutterBottom
          component="div"
          color={"#6c757d"}
          marginTop={"1rem"}
          variant={"body2"}
        >
          Prise: {prise} kr
        </Typography>
      </CardContent>
    </Card>
  );
}
