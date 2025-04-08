import { initializeFeaturedEvents, initializeWeather } from './init.js';
import { createSearchHandler, setupSearchListeners } from './handlers/searchHandlers.js';

// DOM Elements
const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const dateInput = document.getElementById('dateInput');
const eventGrid = document.getElementById('eventGrid');
const loadingIndicator = document.getElementById('loading');
const featuredEventsContainer = document.getElementById('featuredEvents');
const weatherContainer = document.getElementById('weatherGrid');

// Initialize featured content
initializeFeaturedEvents(featuredEventsContainer);
initializeWeather(weatherContainer);

// Setup search functionality
const searchHandler = createSearchHandler({
  cityInput,
  dateInput,
  eventGrid,
  loadingIndicator
});

setupSearchListeners(searchButton, cityInput, dateInput, searchHandler);