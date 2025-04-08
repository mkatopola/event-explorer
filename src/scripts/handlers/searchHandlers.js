import { fetchEvents } from '../api/ticketmaster.js';
import { displayEvents, showError } from '../dom/eventDisplay.js';

export function createSearchHandler({ cityInput, dateInput, eventGrid, loadingIndicator }) {
  return async function handleSearch() {
    const city = cityInput.value.trim();
    const date = dateInput.value;

    if (!city) {
      showError('Please enter a city', eventGrid);
      return;
    }

    try {
      loadingIndicator.style.display = 'block';
      const response = await fetchEvents(city, date);
      
      if (response?._embedded?.events) {
        displayEvents(response._embedded.events, eventGrid);
        setupEventCardListeners();
      } else {
        showError('No events found for this search', eventGrid);
      }
    } catch (error) {
      showError('Failed to fetch events. Please try again.', eventGrid);
    } finally {
      loadingIndicator.style.display = 'none';
    }
  };
}

export function setupSearchListeners(searchButton, cityInput, dateInput, handler) {
  searchButton.addEventListener('click', handler);
  cityInput.addEventListener('keypress', e => e.key === 'Enter' && handler());
  dateInput.addEventListener('keypress', e => e.key === 'Enter' && handler());
}