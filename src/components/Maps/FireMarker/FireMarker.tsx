import { FC } from "react";

import { Marker, Popup } from "react-leaflet";

import { Icon } from "leaflet";
import Fire from "../../../assets/fire.svg";

type FireMarkerProps = {
  fire: Fire;
};

const FireMarker: FC<FireMarkerProps> = ({ fire }) => {
  const wildfireIcon = new Icon({
    iconUrl: Fire,
    iconSize: [38, 38],
  });

  return (
    <div onClick={() => console.log("a")}>
      <Marker
        key={crypto.randomUUID()}
        position={{ lat: fire.latitude, lng: fire.longitude }}
        icon={wildfireIcon}
      >
        <Popup>
          {fire.latitude}, {fire.longitude}
        </Popup>
      </Marker>
    </div>
  );
};

FireMarker.displayName = "FireMarker";
export { FireMarker };
