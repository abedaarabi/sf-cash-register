import { Fragment } from "react";
import MainHeader from "./main-header";

export const Layout = (props) => {
  return (
    <Fragment>
      <MainHeader />

      <main> {props.children}</main>
    </Fragment>
  );
};
