import type { NextPage } from "next";
import { useAuth } from "../context/AuthContext";

import styles from "../styles/Home.module.css";
import Dashboard from "./dashboard";
import Login from "./login";

// import SignUp from "./signup";

const Home: NextPage = () => {
  const { user } = useAuth();

  return <div>{user ? <Dashboard /> : <Login />}</div>;
};

export default Home;
