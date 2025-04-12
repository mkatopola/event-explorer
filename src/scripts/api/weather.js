import { CONFIG } from "../constants";
import { showError } from "../utils/helpers";

const handleWeatherError = (error, context) => {
  console.error(`Weather Error (${context}):`, error);
  return null;
};

// 1. Forecast for Event Details
export const fetchWeatherForecast = async (lat, lon, eventDate) => {
  try {
    const response = await fetch(
      `${CONFIG.OPENWEATHER.FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${CONFIG.OPENWEATHER.API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Weather error: ${errorData.message}`);
    }
    
    const data = await response.json();
    return findClosestForecast(data.list, eventDate);
  } catch (error) {
    return handleWeatherError(error, "forecast");
  }
};

// 2. Random Cities Weather
export const getRandomCitiesWeather = async () => {
  try {
    const randomCities = [...CONFIG.OPENWEATHER.CITIES]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

    return await Promise.all(randomCities.map(fetchCityWeather));
  } catch (error) {
    return handleWeatherError(error, "random-cities");
  }
};

// 3. City Weather Data
export const fetchCityWeather = async (cityName) => {
  try {
    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${CONFIG.OPENWEATHER.API_KEY}`
    );
    const [location] = await geoResponse.json();
    
    if (!location) throw new Error("Location not found");
    
    const weatherResponse = await fetch(
      `${CONFIG.OPENWEATHER.CURRENT_WEATHER_URL}?lat=${location.lat}&lon=${location.lon}&appid=${CONFIG.OPENWEATHER.API_KEY}&units=metric`
    );
    
    const weatherData = await weatherResponse.json();
    return {
      city: cityName,
      temp: Math.round(weatherData.main.temp),
      condition: weatherData.weather[0].main,
      icon: weatherData.weather[0].icon
    };
  } catch (error) {
    return handleWeatherError(error, "city-weather");
  }
};

// 4. Batch Weather Requests
export const batchFetchWeather = async (coordinatesList) => {
  try {
    return await Promise.all(
      coordinatesList.map(async ({ lat, lon, eventId }) => {
        const data = await fetchWeatherForecast(lat, lon, Date.now());
        return { eventId, data };
      })
    );
  } catch (error) {
    return handleWeatherError(error, "batch-weather");
  }
};

// Helper function
const findClosestForecast = (forecasts, eventDate) => {
  const targetTime = new Date(eventDate).getTime();
  return forecasts.reduce((closest, current) => {
    const currentDiff = Math.abs(new Date(current.dt_txt).getTime() - targetTime);
    return currentDiff < Math.abs(new Date(closest.dt_txt).getTime() - targetTime) 
      ? current 
      : closest;
  }, forecasts[0]);
};