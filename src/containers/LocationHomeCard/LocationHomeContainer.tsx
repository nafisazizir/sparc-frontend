import Tag from "../../components/Tag/Tag";
import "./style.css";
import { useNavigate } from "react-router-dom";

interface LocationHomeCardProps {
  locationData: string[];
  severity: "safe" | "yellow" | "red";
}

const LocationHomeContainer: React.FC<LocationHomeCardProps> = ({
  locationData,
  severity,
}) => {
  const navigate = useNavigate();
  let text = "";
  let variant: "info" | "warning" | "error" = "info";

  if (severity === "safe") {
    text = "Safe Zone";
    variant = "info";
  } else if (severity === "yellow") {
    text = "Yellow Zone";
    variant = "warning";
  } else if (severity === "red") {
    text = "Red Zone";
    variant = "error";
  }

  return (
    <div
      className="location-home-container flex flex-col gap-2 shadow-2xl cursor-pointer"
      onClick={() => navigate("/details")}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold text-sm text-jordy-blue-500">
            Your current location
          </div>
          <div className="font-bold text-lg">
            {locationData[0]}, {locationData[1]}
          </div>
        </div>

        <Tag text={text} variant={variant} />
      </div>

      <div className="text-xs text-gray-400 font-medium">
        There are near wildfire, but it wont directly impact this area
      </div>

      <div className="border-b border-gray-400" />

      <div className="text-xs font-medium">
        Anginnya Berapa, Panasnya Berapa, Datanya Apa aja
      </div>

      <div />
    </div>
  );
};

export default LocationHomeContainer;
