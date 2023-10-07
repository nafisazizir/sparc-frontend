import React, { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="max-w-screen-sm m-auto">
      <Navbar />
      <div className="">{children}</div>
    </div>
  );
};

export default Layout;
