import { setupSearchHandlers } from "./handlers/searchHandlers";
import { displayFeaturedEvents } from "./dom/featured";
import { displayWeather } from "./dom/weather";

export const initializeApp = () => {
  document.addEventListener("DOMContentLoaded", () => {
    displayFeaturedEvents();
    displayWeather();
    setupSearchHandlers();
  });
};