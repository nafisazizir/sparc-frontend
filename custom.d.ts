declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.ComponentProps<"svg"> & { title?: string }
  >;
  export default ReactComponent;
}

declare type Fire = {
  timestamp: Date;
  latitude: number;
  longitude: number;
  intensity: number;
};

declare type Smoke = {
  lat: number;
  lon: number;
  red_lat: number;
  red_lon: number;
  red_area: number;
  yellow_lat: number;
  yellow_lon: number;
  yellow_area: number;
}
