import 'dotenv/config';

// API Configuration
const API_KEY = process.env.PUBLIC_TICKETMASTER_API_KEY;

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';
console.log(API_KEY); // For debugging purposes, remove in production
if (!API_KEY) {
    console.error('API key is not defined. Please set the VITE_TICKETMASTER_API_KEY environment variable.');
}
// DOM Elements
const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const dateInput = document.getElementById('dateInput');
const eventGrid = document.getElementById('eventGrid');
const loadingIndicator = document.getElementById('loading');

async function fetchEvents(city, date) {
    const params = new URLSearchParams({
        apikey: API_KEY,
        city: city,
        size: 20,
        sort: 'date,asc'
    });

    if (date) {
        params.set('startDateTime', `${date}T00:00:00Z`);
    }

    try {
        loadingIndicator.style.display = 'block';
        const response = await fetch(`${BASE_URL}?${params}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);
        return data;
    } catch (error) {
        console.error('Error fetching events:', error);
        showError('Failed to fetch events. Please try again.');
        return null;
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

function showError(message) {
    eventGrid.innerHTML = `<div class="error-message">${message}</div>`;
}

function displayEvents(events) {
    if (!events || events.length === 0) {
        eventGrid.innerHTML = '<p>No events found for this search.</p>';
        return;
    }

    eventGrid.innerHTML = events.map(event => `
        <div class="event-card">
            ${event.images?.[0]?.url ? 
                `<img src="${event.images[0].url}" alt="${event.name}">` : 
                '<div class="image-placeholder">No Image Available</div>'}
            <h3>${event.name}</h3>
            <p>Date: ${new Date(event.dates.start.dateTime).toLocaleDateString()}</p>
            <p>Venue: ${event._embedded?.venues?.[0]?.name || 'Unknown venue'}</p>
            ${event.url ? `<a href="${event.url}" target="_blank" class="event-link">More Info</a>` : ''}
        </div>
    `).join('');
}

async function handleSearch() {
    const city = cityInput.value.trim();
    const date = dateInput.value;

    if (!city) {
        showError('Please enter a city');
        return;
    }

    const response = await fetchEvents(city, date);
    
    if (response && response._embedded?.events) {
        displayEvents(response._embedded.events);
    } else {
        showError('No events found for this search');
    }
}

// Event Listeners
searchButton.addEventListener('click', handleSearch);

// Optional: Add enter key support
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});
dateInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});