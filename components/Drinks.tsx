import * as React from "react";
import Card from "@mui/material/Card";
import { faAngleRight, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Typography from "@mui/material/Typography";
import styles from "../styles/Home.module.css";
export function Drinks({ img, name, decription, prise, recipe }: any) {
  const [isHide, setIsHide] = React.useState(false);
  const arrow = isHide ? faAngleDown : faAngleRight;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" alt="green iguana" height="180" image={img} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color={"#343a40"}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {decription}
        </Typography>
        <Typography variant="body2" color="text.secondary" marginTop={"1rem"}>
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
            <ul>
              {recipe?.map((i: string, idx: any) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          )}
        </Typography>
        <Typography
          gutterBottom
          component="div"
          color={"#6c757d"}
          marginTop={"1rem"}
        >
          Prise: {prise}
        </Typography>
      </CardContent>
    </Card>
  );
}
