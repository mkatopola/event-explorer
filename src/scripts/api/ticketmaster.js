import { DOM, CONFIG } from "../constants";

export const fetchEvents = async (city, date) => {
  const params = new URLSearchParams({
    apikey: CONFIG.TICKETMASTER.API_KEY,
    city,
    size: 20,
    sort: "date,asc"
  });

  if (date) params.set("startDateTime", `${date}T00:00:00Z`);

  try {
    DOM.loadingIndicator.style.display = "block";
    const response = await fetch(`${CONFIG.TICKETMASTER.BASE_URL}.json?${params}`);
    if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
    return await response.json();
  } finally {
    DOM.loadingIndicator.style.display = "none";
  }
};

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