/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Tag from "../../components/Tag/Tag";
import Collapsible from "react-collapsible";
import DetailsService from "../../services/Details";
import { useEffect, useState } from "react";

const DetailsContainer = () => {
  const location = [-6.22584, 106.856812];
  const locationData = ["Depok, Jawa Barat"];
  const [aqi, setAqi] = useState(0);
  const [healthRecommendation, setHealthRecommendation] = useState([]);
  const severity = "safe";
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

  useEffect(() => {
    const getAQI = async () => {
      try {
        const response = await DetailsService.getAQI(location[0], location[1]);
        console.log(response);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    getAQI();
  }, []);

  const triggerTitle = (
    <>
      <div className="flex items-center justify-between py-3">
        <div className="font-bold text-md">Athlete</div>
        <div>Icon</div>
      </div>
    </>
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold text-sm text-jordy-blue-500">
            Your current location
          </div>
          <div className="font-bold text-lg">
            {locationData[0]} {locationData[1]}
          </div>
        </div>

        <Tag text={text} variant={variant} />
      </div>
      <div />

      <div className="text-lg font-bold">Health Recommendation</div>
      <Collapsible trigger={triggerTitle}>
        <div className="text-sm">
          This is the collapsible content. It can be any element or React
          component you like.
        </div>
      </Collapsible>
    </div>
  );
};

export default DetailsContainer;
