import { FC } from "react";
import { Circle, FeatureGroup } from "react-leaflet";

type SmokeMarkerProps = {
  smoke: Smoke;
};

const SmokeMarker: FC<SmokeMarkerProps> = ({ smoke }) => {
  return (
    <FeatureGroup>
      <Circle
        pathOptions={{ color: "yellow" }}
        center={[smoke.yellow_lat, smoke.yellow_lon]}
        radius={smoke.yellow_area * 1000}
      />
      <Circle
        pathOptions={{ color: "red" }}
        center={[smoke.red_lat, smoke.red_lon]}
        radius={smoke.red_area * 1000}
      />
    </FeatureGroup>
  );
};

SmokeMarker.displayName = "SmokeMarker";
export { SmokeMarker };
