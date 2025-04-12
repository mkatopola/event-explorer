import { DOM } from "../constants";
import { fetchEvents } from "../api/ticketmaster";
import { displayEvents, showError } from "../dom/events";

const handleSearch = async () => {
  const city = DOM.cityInput.value.trim();
  const date = DOM.dateInput.value;

  if (date && new Date(date) < new Date().setHours(0, 0, 0, 0)) {
    showError("Please select a current or future date");
    return;
  }

  if (!city) return showError("Please enter a city");

  const data = await fetchEvents(city, date);
  data?._embedded?.events
    ? displayEvents(data._embedded.events)
    : showError("No events found");
};

export const setupSearchHandlers = () => {
  DOM.searchButton.addEventListener("click", handleSearch);
  DOM.cityInput.addEventListener(
    "keypress",
    (e) => e.key === "Enter" && handleSearch()
  );
  DOM.dateInput.addEventListener(
    "keypress",
    (e) => e.key === "Enter" && handleSearch()
  );
};
