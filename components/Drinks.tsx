import * as React from "react";
import Card from "@mui/material/Card";
import { faAngleRight, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Typography from "@mui/material/Typography";

import { useAuth } from "../context/AuthContext";
import styles from "../styles/Home.module.css";
export function Drinks({ img, name, description, prise, recipe }: any) {
  const { user } = useAuth();
  const [isHide, setIsHide] = React.useState(false);
  const arrow = isHide ? faAngleDown : faAngleRight;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" alt="green iguana" height="180" image={img} />
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
                <ul>
                  {recipe?.map((i: string, idx: any) => (
                    <li key={idx}>{i}</li>
                  ))}
                </ul>
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
          Prise: {prise}
        </Typography>
      </CardContent>
    </Card>
  );
}
