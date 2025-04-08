import { DOM } from "./constants";
import { fetchEventDetails } from "./api/ticketmaster";
import { displayEventDetails } from "./dom/eventDetails";

(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get("eventId");

  if (!eventId) {
    DOM.eventDetails.innerHTML = "<p>No event specified</p>";
    return;
  }

  const eventData = await fetchEventDetails(eventId);
  if (eventData) displayEventDetails(eventData);
})();