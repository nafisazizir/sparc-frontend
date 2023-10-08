import React, { createContext, useContext, useState, ReactNode } from "react";

interface LocationContextProps {
  location: [number, number];
  setLocation: React.Dispatch<React.SetStateAction<[number, number]>>;
  locationData: [string, string];
  setLocationData: React.Dispatch<React.SetStateAction<[string, string]>>;
}

const LocationContext = createContext<LocationContextProps | undefined>(
  undefined
);

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({
  children,
}) => {
  const [location, setLocation] = useState<[number, number]>([-6.2, 106.81]);
  const [locationData, setLocationData] = useState<[string, string]>([
    "Jakarta",
    "Jakarta",
  ]);

  return (
    <LocationContext.Provider
      value={{ location, setLocation, locationData, setLocationData }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): LocationContextProps => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
