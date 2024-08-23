import React from "react";
import { Outlet } from "react-router-dom";

const Content : React.FC = () => {
  return (
    <Outlet />
  );
}

export default Content;