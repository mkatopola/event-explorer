import { CONFIG } from "../constants";

export const fetchWeatherForecast = async (lat, lon, eventDate) => {
  try {
    const response = await fetch(
      `${CONFIG.OPENWEATHER.BASE_URL}?lat=${lat}&lon=${lon}&appid=${CONFIG.OPENWEATHER.API_KEY}&units=metric`
    );
    
    if (!response.ok) throw new Error("Weather data unavailable");
    const data = await response.json();
    
    return findClosestForecast(data.list, eventDate);
  } catch (error) {
    console.error("Weather fetch error:", error);
    return null;
  }
};

const findClosestForecast = (forecasts, eventDate) => {
  const targetTime = new Date(eventDate).getTime();
  return forecasts.reduce((closest, current) => {
    const currentDiff = Math.abs(new Date(current.dt_txt).getTime() - targetTime);
    const closestDiff = Math.abs(new Date(closest.dt_txt).getTime() - targetTime);
    return currentDiff < closestDiff ? current : closest;
  });
};