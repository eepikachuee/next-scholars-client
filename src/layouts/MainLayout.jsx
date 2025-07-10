import { Outlet } from "react-router";
import ThemeToggle from "../components/button/ThemeToggle";
import React from "react";
import Navbar from "../components/navbar/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-64px)]">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default MainLayout;
