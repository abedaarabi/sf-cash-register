import React from "react";
import { GetCloseRegister } from "../components/GetCloseRegister";
import { useAuth } from "../context/AuthContext";

const DataResult = () => {
  const { user } = useAuth();

  return (
    <div>
      <GetCloseRegister />
    </div>
  );
};

export default DataResult;
