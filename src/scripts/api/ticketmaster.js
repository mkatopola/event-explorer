import { DOM, CONFIG } from "../constants";

// Fetch events based on search criteria
export const fetchEvents = async (city, date) => {
  const params = new URLSearchParams({
    apikey: CONFIG.TICKETMASTER.API_KEY,
    city,
    size: 20,
    sort: "date,asc",
    // Add current datetime filter
    startDateTime: new Date().toISOString()
  });

  // If user selects specific date, override filter
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
};

// Fetch details for a specific event
export const fetchEventDetails = async (eventId) => {
  try {
    const response = await fetch(
      `${CONFIG.TICKETMASTER.BASE_URL}/${eventId}.json?apikey=${CONFIG.TICKETMASTER.API_KEY}`
    );
    if (!response.ok) throw new Error("Event not found");
    return await response.json();
  } catch (error) {
    console.error("Event details error:", error);
    return null;
  }
};

// Fetch and randomize featured events
export const fetchFeaturedEvents = async () => {
  const params = new URLSearchParams({
    apikey: CONFIG.TICKETMASTER.API_KEY,
    size: 20,
    sort: "date,asc",
    // Show events starting from today
    startDateTime: new Date().toISOString(),
    // Look ahead 3 months
    endDateTime: new Date(Date.now() + 92 * 24 * 60 * 60 * 1000).toISOString()
  });

  try {
    const response = await fetch(`${CONFIG.TICKETMASTER.BASE_URL}.json?${params}`);
    if (!response.ok) throw new Error("Featured events fetch failed");
    const data = await response.json();
    const events = data._embedded?.events || [];
    
    // Return 4 random events from today's list
    return events.sort(() => 0.5 - Math.random()).slice(0, 4);
  } catch (error) {
    console.error("Featured events error:", error);
    return [];
  }
};