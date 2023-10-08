import { forwardRef, useEffect } from "react";

import "leaflet-velocity/dist/leaflet-velocity.css";
import "leaflet-velocity/dist/leaflet-velocity.js";
import { useMap } from "react-leaflet";
import L, { Control } from "leaflet";

const LeafletVelocity = forwardRef<Control.Layers>((_, ref) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    let mounted = true;
    let windLayer;

    fetch(
      "https://firebasestorage.googleapis.com/v0/b/nasa-sparc.appspot.com/o/wind.json?alt=media"
    )
      .then((response) => response.json())
      .then((data) => {
        if (!mounted) return;

        windLayer = L.velocityLayer({
          displayValues: true,
          displayOptions: {
            velocityType: "Wind",
            position: "bottomleft",
            emptyString: "No wind data",
          },
          data: data,
          maxVelocity: 15,
          velocityScale: 0.1,
        });

        if (ref?.current && windLayer) {
          ref.current.addOverlay(windLayer, "Wind Simulation");
        }
      })
      .catch((err) => console.log(err));

    return () => {
      mounted = false;
      if (ref?.current) {
        ref.current?.removeOverlay(windLayer);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  return null;
});

export default LeafletVelocity;
