import type { NextPage } from "next";
import { useAuth } from "../context/AuthContext";
import { Landing } from "../components/landing/Landing";
import Dashboard from "./dashboard";

const Home: NextPage = () => {
  const { user } = useAuth();

  return user ? <Dashboard /> : <Landing />;
};

export default Home;
