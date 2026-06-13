import type { NextPage } from "next";
import { useAuth } from "../context/AuthContext";
import Dashboard from "./dashboard";
import Login from "./login";

const Home: NextPage = () => {
  const { user } = useAuth();

  return <div>{user ? <Dashboard /> : <Login />}</div>;
};

export default Home;
