import { Outlet } from "react-router";
import ThemeToggle from "../components/button/ThemeToggle";
import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-64px)] mt-18">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
