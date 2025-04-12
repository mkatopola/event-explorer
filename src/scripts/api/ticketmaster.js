// src/scripts/api/ticketmaster.js
import { DOM, CONFIG } from "../constants";
import { shuffleArray } from "../utils/helpers";
import { withRetry } from "../utils/apiHelpers";

// Main events fetch with retry
export const fetchEvents = withRetry(async (city, date) => {
  const params = new URLSearchParams({
    apikey: CONFIG.TICKETMASTER.API_KEY,
    city,
    size: 20,
    sort: "date,asc",
    startDateTime: new Date().toISOString()
  });

  if (date) {
    params.set('startDateTime', `${date}T00:00:00Z`);
    params.set('endDateTime', `${date}T23:59:59Z`);
  }

  try {
    DOM.loadingIndicator.style.display = "block";
    const response = await fetch(`${CONFIG.TICKETMASTER.BASE_URL}.json?${params}`);
    if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
    return await response.json();
  } finally {
    DOM.loadingIndicator.style.display = "none";
  }
});

// Explicitly exported event details fetch
export const fetchEventDetails = withRetry(async (eventId) => {
  try {
    const response = await fetch(
      `${CONFIG.TICKETMASTER.BASE_URL}/${eventId}.json?apikey=${CONFIG.TICKETMASTER.API_KEY}`
    );
    if (!response.ok) throw new Error("Event not found");
    return await response.json();
  } catch (error) {
    console.error("Event details error:", error);
    throw error; // Required for retry logic
  }
});

// Featured events implementation
export const fetchFeaturedEvents = async () => {
  try {
    const params = new URLSearchParams({
      apikey: CONFIG.TICKETMASTER.API_KEY,
      size: 50,
      sort: "date,asc",
      startDateTime: new Date().toISOString(),
      endDateTime: new Date(Date.now() + 92 * 24 * 60 * 60 * 1000).toISOString()
    });

    const response = await fetch(`${CONFIG.TICKETMASTER.BASE_URL}.json?${params}`);
    if (!response.ok) throw new Error("Featured events fetch failed");
    
    const data = await response.json();
    return shuffleArray(data._embedded?.events || []).slice(0, 4);
  } catch (error) {
    console.error("Featured events error:", error);
    return [];
  }
};