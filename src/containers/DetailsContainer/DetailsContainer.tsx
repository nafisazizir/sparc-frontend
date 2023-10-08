/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Tag from "../../components/Tag/Tag";
import Collapsible from "react-collapsible";
import DetailsService from "../../services/Details";
import { useEffect, useState } from "react";
import { AQIIndex, HealthRecommendations } from "../../services/Details";
import { useLocation } from "../../context/LocationContext";
import Plus from "../../assets/plus.svg?react";
import Minus from "../../assets/minus.svg?react";
import "./style.css";

const DetailsContainer = () => {
  const { location, locationData } = useLocation();
  const [aqiIndex, setAqiIndex] = useState<AQIIndex>();
  const [healthRecommendations, setHealthRecommendations] =
    useState<HealthRecommendations>({
      generalPopulation: "",
      elderly: "",
      lungDiseasePopulation: "",
      heartDiseasePopulation: "",
      athletes: "",
      pregnantWomen: "",
      children: "",
    });
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
        setAqiIndex(response.data.indexes[0]);
        setHealthRecommendations(response.data.healthRecommendations);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    getAQI();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="font-bold text-xl">
          {locationData[0]}, {locationData[1]}
        </div>

        <Tag text={text} variant={variant} />
      </div>

      <div className="flex flex-col">
        <div className="custom-aqi text-center text-5xl font-medium ">
          {aqiIndex?.aqi}
        </div>
        <div className="text-center text-md">{aqiIndex?.category}</div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="text-xl text-jordy-blue-500 font-bold">
          Health Recommendation
        </div>

        <div className="flex flex-col gap-3">
          <div className="border-b border-gray-400" />
          {Object.entries(healthRecommendations).map(([key, value]) => {
            const formattedKey = key
              .split(/(?=[A-Z])/)
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ");
            const triggerTitle = (
              <>
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-md">{formattedKey}</div>
                  <div className="mr-4 trigger-title">
                    <Plus />
                  </div>
                </div>
              </>
            );
            const triggerWhenOpen = (
              <>
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-md">{formattedKey}</div>
                  <div className="mr-4 trigger-title">
                    <Minus />
                  </div>
                </div>
              </>
            );
            return (
              <>
                <Collapsible
                  key={key}
                  trigger={triggerTitle}
                  triggerWhenOpen={triggerWhenOpen}
                >
                  <div className="text-sm text-gray-600">{value}</div>
                </Collapsible>
                <div className="border-b border-gray-400" />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DetailsContainer;
