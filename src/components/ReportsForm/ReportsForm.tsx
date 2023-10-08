/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Button from "../Button/Button/Button";
import Logo from "../../assets/logo.svg?react";
import "./style.css";
import DropdownSelect from "./DropdownSelect";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import useReportModal from "./useReportsForm";

interface ReportsFormProps {
  title: string;
  subtitle: string;
  onCancel: () => void;
}

const perceivedAirQuality = [
  {
    value: "normal",
    label: "Normal"
  },
  {
    value: "quite_unhealthy",
    label: "Quite Unhealthy"
  },
  {
    value: "very_unhealthy",
    label: "Very Unhealthy"
  },
  {
    value: "hazardous",
    label: "Hazardous"
  }
];

const smokeIntensity = [
  {
    value: "none",
    label: "None Visible"
  },
  {
    value: "visible",
    label: "Visible"
  },
  {
    value: "thick",
    label: "Thick"
  }
];

const ReportsForm: React.FC<ReportsFormProps> = ({
  title,
  subtitle,
  onCancel,
}) => {
  // const [submitted, setSubmitted] = React.useState<boolean>(false);
  const submitted = false;
  // const [submitted, setSubmitted] = React.useState<boolean>(false);
  const [latitude, setLatitude] = React.useState<number>(0);
  const [longitude, setLongitude] = React.useState<number>(0);
  // const reportModal = useReportModal();

  React.useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

         setLatitude(latitude);
         setLongitude(longitude);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const { handleSubmit, setValue } = useForm();

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // Get user location
    getUserLocation();

    const url = "https://us-central1-nasa-sparc.cloudfunctions.net/handle-user-report";

    const body = JSON.stringify({
      report: {
        heard_wildfire: true,
        air_quality: data.perceivedAirQuality,
        smoke_intensity: data.smokeIntensity,
        smoke_description: ""
      },
      user_location: {
        latitude,
        longitude
      },
      timestamp: Date.now()
    })

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    }

    try {
      const res = await fetch(url, options);

      if (res.ok) {
        console.log("Successfully saved to database");
      } else {
        console.log("Something went wrong.")
      }
    } catch (e) {
      console.error(e);
    }

    document.location.href = "/";
  };

  if (submitted) {
    return (
      <div className="modal-container">
      <div className="rounded-lg px-6 py-8 w-4/5 bg-white flex flex-col items-center gap-8 text-center">
        <Logo />

        <div className="flex flex-col items-center gap-3">
          <div className="text-sm font-bold text-center">{"Thanks for helping communities to respond to smoke!"}</div>
          {/* <div className="text-sm text-center">{subtitle}</div> */}
        </div>

        <div className="flex flex-row justify-center items-center">
          {/* Cancel */}
          <Button label={"Close"} onClick={onCancel} secondary size="small" />
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className="modal-container">
      <div className="rounded-lg px-6 py-8 w-4/5 bg-white flex flex-col items-center gap-8 text-center">
        <Logo />

        <div className="flex flex-col items-center gap-3">
          <div className="text-sm font-bold text-center">{title}</div>
          <div className="text-sm text-center">{subtitle}</div>
        </div>

        <div className="w-full flex flex-col gap-4 max-h-[300px]">
          <div className="w-full px-1 space-y-4">
            <div className="space-y-2">
              <h6>How is the air quality in your location?</h6>
              <DropdownSelect
                placholder="Normal"
                onChange={(value) => setCustomValue("perceivedAirQuality", value)}
                options={perceivedAirQuality}
              />
            </div>

            <div className="space-y-2">
              <h6>How intense are the smoke, if any?</h6>
              <DropdownSelect
                placholder="None Visible"
                onChange={(value) => setCustomValue("smokeIntensity", value)}
                options={smokeIntensity}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-center items-center">
          {/* Cancel */}
          <Button label={"Cancel"} onClick={onCancel} secondary size="small" />
          
          <div className="px-2"></div>

          {/* Submit */}
          <Button 
            label={"Submit"} 
            onClick={handleSubmit(onSubmit)}
            size="small" 
          />
        </div>
      </div>
    </div>
  );
};

export default ReportsForm;

