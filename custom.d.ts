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
  smoke: [number, number][];
};
