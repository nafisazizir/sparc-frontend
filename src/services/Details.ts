import http from "../http-common";
import { AxiosResponse } from "axios";

export interface AQIIndex {
  code: string;
  displayName: string;
  aqi: number;
  aqiDisplay: string;
  color: {
    red?: number;
    green?: number;
    blue?: number;
  };
  category: string;
  dominantPollutant: string;
}

interface Pollutant {
  code: string;
  displayName: string;
  fullName: string;
  concentration: {
    value: number;
    units: string;
  };
  additionalInfo: {
    sources: string;
    effects: string;
  };
}

export interface HealthRecommendations {
  generalPopulation: string;
  elderly: string;
  lungDiseasePopulation: string;
  heartDiseasePopulation: string;
  athletes: string;
  pregnantWomen: string;
  children: string;
}

export interface AQIResponse {
  dateTime: string;
  regionCode: string;
  indexes: AQIIndex[];
  pollutants: Pollutant[];
  healthRecommendations: HealthRecommendations;
}

class DetailsService {
  getAQI(lat: number, long: number): Promise<AxiosResponse<AQIResponse>> {
    return http.post(`air-quality-index/`, {
      latitude: lat,
      longitude: long,
      languageCode: "en",
    });
  }
}

export default new DetailsService();
