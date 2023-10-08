const haversineDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371.0; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export const checkZone = (smokes: Smoke[], latitude: number, longitude: number) => {
  for (const entry of smokes) {
    const redZoneDistance = haversineDistance(
      latitude,
      longitude,
      entry.red_lat,
      entry.red_lon
    );

    const redZoneRadius = Math.sqrt(entry.red_area / Math.PI);
    const yellowZoneRadius =
      Math.sqrt(entry.yellow_area / Math.PI) + redZoneRadius;

    if (redZoneDistance <= redZoneRadius) {
      return "red";
    } else if (redZoneDistance <= yellowZoneRadius) {
      return "yellow";
    }
  }

  return "safe";
};
