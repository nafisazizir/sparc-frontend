import React, { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";

interface MapLayoutProps {
  children: ReactNode;
}

const MapLayout: React.FC<MapLayoutProps> = ({ children }) => {
  return (
    <div className="max-w-screen-sm m-auto h-screen relative">
      <Navbar />
      {children}
    </div>
  );
};

export default MapLayout;
