import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Rcomponent/Navbar";
export const AppLayouts = () => {
  return (
    <>
      <Navbar />
      <Outlet /> {/*for nested route render*/}
    </>
  );
};
