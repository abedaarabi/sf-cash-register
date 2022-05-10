import * as React from "react";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import styles from "../styles/Home.module.css";
export function Drinks({ img, name, recipe, prise }: any) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" alt="green iguana" height="180" image={img} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color={"#a2d2ff"}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {recipe}
        </Typography>
        <Typography
          gutterBottom
          component="div"
          color={"#b5838d"}
          marginTop={"1rem"}
        >
          Prise: {prise}
        </Typography>
      </CardContent>
    </Card>
  );
}
