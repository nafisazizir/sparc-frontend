import { useState, useEffect, useRef } from "react";
import "./style.css";

import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../utils/firebase";

import { useLocation } from "../../context/LocationContext";
import ReportsForm from "../../components/ReportsForm/ReportsForm";

import { Control } from "leaflet";
import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  LayersControl,
  FeatureGroup,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import Modal from "../../components/Modal/Modal";
import MapLayout from "../../components/MapLayout/MapLayout";
import LocationHomeContainer from "../../containers/LocationHomeCard/LocationHomeContainer";
import { FireMarker } from "../../components/Maps/FireMarker/FireMarker";

import ReportLogo from "../../assets/report.svg?react";
import CurrentLocation from "../../assets/current-location.svg?react";
import LeafletVelocity from "../../components/Maps/LeafletVelocity/LeafletVelocity";
import { SmokeMarker } from "../../components/Maps/SmokeMarker/SmokeMarker";

const Home = () => {
  const { location, setLocation, locationData, setLocationData } =
    useLocation();
  const [modalVisible, setModalVisible] = useState(true);
  const [formVisible, setFormVisible] = useState(false);

  const [fires, setFires] = useState<Fire[]>([]);
  useEffect(() => {
    (async () => {
      const url = await getDownloadURL(ref(storage, "fire.json"));
      fetch(url)
        .then((res) => res.json())
        .then((json) => setFires(json));
    })();
  }, []);

  const [smokes, setSmokes] = useState<Smoke[]>([]);
  useEffect(() => {
    (async () => {
      const url = await getDownloadURL(ref(storage, "smoke.json"));
      fetch(url)
        .then((res) => res.json())
        .then((json) => setSmokes(json));
    })();
  }, []);

  const layerControlRef = useRef<Control.Layers>(null);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  function UpdatedMap() {
    const map = useMap();
    map.panTo(location);
    return null;
  }

  function MoveToCurrentLocation() {
    const map = useMap();
    map.panTo(location);
    return null;
  }

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location[0]}&longitude=${location[1]}&localityLanguage=en`
        );

        if (response.ok) {
          const data = await response.json();
          setLocationData([data.city, data.principalSubdivision]);
        } else {
          console.error("Error fetching data from API");
        }
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchData();
  }, [location, setLocationData]);

  const jawgAccessToken = import.meta.env.VITE_MAP_ACCESS_TOKEN;

  return (
    <MapLayout>
      <div
        className="current-location bg-jordy-blue-500 rounded-full w-min p-0.5 absolute"
        onClick={MoveToCurrentLocation}
      >
        <CurrentLocation />
      </div>

      <div
        className="report-form bg-jordy-blue-500 rounded-full w-min p-0.5 absolute"
        onClick={() => setFormVisible(true)}
      >
        <ReportLogo />
      </div>

      {formVisible && (
        <ReportsForm
          title={"Report smoke in your area"}
          subtitle="Your report will be used to better inform the community regarding local wildfire smoke information"
          onCancel={() => setFormVisible(false)}
        />
      )}

      {modalVisible && (
        <Modal
          title={
            "Predicting Local Air Quality Conditions Through Wildfire Smoke Movement Prediction with SPARC."
          }
          subtitle={
            "This app requires permission to access your location in order to check if wildfire smoke affects your area"
          }
          buttonLabel={"Understand"}
          onClick={() => {
            setModalVisible(false);
          }}
        />
      )}

      <MapContainer center={location} zoom={11} attributionControl={false}>
        <TileLayer
          attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=${jawgAccessToken}`}
        />

        <UpdatedMap />

        <Marker position={location}>
          <Popup>Your location</Popup>
        </Marker>

        <LayersControl position="topright" ref={layerControlRef}>
          <LayersControl.Overlay name="Active Fire">
            <MarkerClusterGroup checked chunkedLoading>
              {fires.map((f) => (
                <FireMarker key={crypto.randomUUID()} fire={f} />
              ))}
            </MarkerClusterGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Smoke Simulation">
            <FeatureGroup>
              {smokes.map((s) => (
                <SmokeMarker key={crypto.randomUUID()} smoke={s} />
              ))}
            </FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>

        <LeafletVelocity ref={layerControlRef} />
      </MapContainer>

      <LocationHomeContainer locationData={locationData} severity="safe" />
    </MapLayout>
  );
};

export default Home;
