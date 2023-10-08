import { useState, useEffect } from "react";
import MapLayout from "../../components/MapLayout/MapLayout";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import Modal from "../../components/Modal/Modal";
import LocationHomeContainer from "../../containers/LocationHomeCard/LocationHomeContainer";
import "leaflet/dist/leaflet.css";
import "./style.css";
import { Icon } from "leaflet";
import Fire from "../../assets/fire.svg";
import MarkerClusterGroup from "react-leaflet-cluster";
import CurrentLocation from "../../assets/current-location.svg?react";
import { useLocation } from "../../context/LocationContext";

const Home = () => {
  const { location, setLocation, locationData, setLocationData } =
    useLocation();
  const [modalVisible, setModalVisible] = useState(true);

  const wildfirePoints: [number, number][] = [
    [-6.23, 106.75],
    [-6.14, 106.93],
    [-6.13, 106.82],
  ];
  const wildfireIcon = new Icon({
    iconUrl: Fire,
    iconSize: [38, 38],
  });

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

        <MarkerClusterGroup chunkedLoading>
          {wildfirePoints.map((point) => (
            <Marker
              key={crypto.randomUUID()}
              position={point}
              icon={wildfireIcon}
            ></Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>

      <LocationHomeContainer locationData={locationData} severity="safe" />
    </MapLayout>
  );
};

export default Home;
