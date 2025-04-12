import { setupSearchHandlers } from "./handlers/searchHandlers";
import { displayFeaturedEvents } from "./dom/featured";
import { displayWeather } from "./dom/weather";

export const initializeApp = () => {
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      await Promise.all([
        displayFeaturedEvents(),  // Now properly imported
        displayWeather()          // Now properly imported
      ]);
      setupSearchHandlers();
    } catch (error) {
      console.error("Initialization error:", error);
    }
  });
};