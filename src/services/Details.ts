import http from "../http-common";

class DetailsService {
  getAQI(lat: number, long: number): Promise<unknown> {
    return http.post(`air-quality-index/`, {
      latitude: lat,
      longitude: long,
      languageCode: "en",
    });
  }
}

export default new DetailsService();
