import { DOM } from "../constants";
import { fetchEvents } from "../api/ticketmaster";
import { displayEvents } from "../dom/events";
import { showError } from "../utils/helpers";

const handleSearch = async () => {
  try {
    // Hide other sections
    document.querySelector('.categories-grid').style.display = 'none';
    document.querySelector('.featured-events').style.display = 'none';
    document.querySelector('.weather-section').style.display = 'none';
    
    // Show loading state
    DOM.loadingIndicator.style.display = "block";
    DOM.eventGrid.innerHTML = "";
    
    const city = DOM.cityInput.value;
    const date = DOM.dateInput.value;
    
    // Fetch events
    const eventsResponse = await fetchEvents(city, date);
    const validEvents = eventsResponse._embedded?.events || [];
    
    // Create results title
    const resultsTitle = document.createElement('h2');
    resultsTitle.className = 'search-results-title';
    resultsTitle.textContent = `Events in ${city || "your area"}${date ? ` on ${date}` : ''}`;
    
    // Clear previous results and insert title
    DOM.eventGrid.parentElement.insertBefore(resultsTitle, DOM.eventGrid);
    DOM.eventGrid.innerHTML = "";
    
    await displayEvents(validEvents);

    // Add Back to All Events button after results
    if (validEvents.length > 0) {
      // Remove existing button if any
      const existingButton = document.querySelector('.back-button');
      if (existingButton) existingButton.remove();

      // Create and append new button
      const backButton = document.createElement('button');
      backButton.className = 'back-button';
      backButton.textContent = '← Back to All Events';
      backButton.onclick = () => window.location.reload();
      
      // Insert after event grid
      DOM.eventGrid.parentElement.appendChild(backButton);
    }
    
  } catch (error) {
    showError("Search failed: " + error.message, DOM.eventGrid);
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