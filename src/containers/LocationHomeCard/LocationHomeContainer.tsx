import Tag from "../../components/Tag/Tag";
import "./style.css";
import { useNavigate } from "react-router-dom";

interface LocationHomeCardProps {
  locationData: string[];
  severity?: "safe" | "yellow" | "red";
}

const LocationHomeContainer: React.FC<LocationHomeCardProps> = ({
  locationData,
  severity,
}) => {
  const navigate = useNavigate();
  let text = "";
  let variant: "info" | "warning" | "error" = "info";
  let infoText = "";

  if (severity === "safe") {
    text = "Safe Zone";
    variant = "info";
    infoText = "You're in a safe area";
  } else if (severity === "yellow") {
    text = "Yellow Zone";
    variant = "warning";
    infoText = "There are near wildfire, but it wont directly impact this area";
  } else if (severity === "red") {
    text = "Red Zone";
    variant = "error";
    infoText = "There’s a possibilities wildfire smoke impact this area";
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

        {severity && <Tag text={text} variant={variant} />}
      </div>

      <div className="text-xs text-gray-400 font-medium">{infoText}</div>

      {/* <div className="border-b border-gray-400" />

      <div className="text-xs font-medium">
        Anginnya Berapa, Panasnya Berapa, Datanya Apa aja
      </div> */}

      <div />
    </div>
  );
};

export default LocationHomeContainer;
