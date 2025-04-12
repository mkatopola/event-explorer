import { DOM } from "../constants";
import { fetchEvents } from "../api/ticketmaster";
import { displayEvents } from "../dom/events";
import { showError } from "../utils/helpers";

const handleSearch = async () => {
  try {
    DOM.loadingIndicator.style.display = "block";
    DOM.eventGrid.innerHTML = "";
    
    const eventsResponse = await fetchEvents(
      DOM.cityInput.value, 
      DOM.dateInput.value
    );
    
    const validEvents = eventsResponse._embedded?.events || [];
    await displayEvents(validEvents);
    
  } catch (error) {
    showError("Failed to load events: " + error.message, DOM.eventGrid);
  } finally {
    DOM.loadingIndicator.style.display = "none";
  }
};

export const setupSearchHandlers = () => {
  DOM.searchButton.addEventListener("click", handleSearch);
  DOM.cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSearch();
  });
};