import React, { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";
import "./style.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="max-w-screen-sm m-auto h-screen">
      <Navbar />
      <div className="layout-container px-4">{children}</div>
    </div>
  );
};

export default Layout;
