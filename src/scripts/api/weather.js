import { CONFIG } from "../constants";

// For event details weather
export const fetchWeatherForecast = async (lat, lon, eventDate) => {
  try {
    const response = await fetch(
      `${CONFIG.OPENWEATHER.BASE_URL}?lat=${lat}&lon=${lon}&appid=${CONFIG.OPENWEATHER.API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenWeather Error:', errorData);
      throw new Error(`Weather error: ${errorData.message}`);
    }
    
    const data = await response.json();
    return findClosestForecast(data.list, eventDate);
  } catch (error) {
    console.error("Weather forecast error:", error);
    return null;
  }
};

// For city weather cards
export const fetchCityWeather = async (cityName) => {
  try {
    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${CONFIG.OPENWEATHER.API_KEY}`
    );
    const [location] = await geoResponse.json();
    
    const weatherResponse = await fetch(
      `${CONFIG.OPENWEATHER.BASE_URL}?lat=${location.lat}&lon=${location.lon}&appid=${CONFIG.OPENWEATHER.API_KEY}&units=metric`
    );
    
    const weatherData = await weatherResponse.json();
    return {
      city: cityName,
      temp: Math.round(weatherData.list[0].main.temp),
      condition: weatherData.list[0].weather[0].main,
      icon: weatherData.list[0].weather[0].icon
    };
  } catch (error) {
    console.error("City weather error:", error);
    return null;
  }
};

// For random city selection
export const getRandomCitiesWeather = async () => {
  const randomCities = [...CONFIG.OPENWEATHER.CITIES]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  const weatherPromises = randomCities.map(fetchCityWeather);
  return (await Promise.all(weatherPromises)).filter(Boolean);
};

// Helper function (no export needed)
const findClosestForecast = (forecasts, eventDate) => {
  const targetTime = new Date(eventDate).getTime();
  return forecasts.reduce((closest, current) => {
    const currentDiff = Math.abs(new Date(current.dt_txt).getTime() - targetTime);
    const closestDiff = Math.abs(new Date(closest.dt_txt).getTime() - targetTime);
    return currentDiff < closestDiff ? current : closest;
  });
};