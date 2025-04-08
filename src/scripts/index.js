import "dotenv/config";

// API Configuration
const API_KEY = process.env.PUBLIC_TICKETMASTER_API_KEY;

const BASE_URL = "https://app.ticketmaster.com/discovery/v2/events.json";
console.log(API_KEY); // For debugging purposes, remove in production
if (!API_KEY) {
  console.error(
    "API key is not defined. Please set the PUBLIC_TICKETMASTER_API_KEY environment variable."
  );
}
// DOM Elements
const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("cityInput");
const dateInput = document.getElementById("dateInput");
const eventGrid = document.getElementById("eventGrid");
const loadingIndicator = document.getElementById("loading");

async function fetchEvents(city, date) {
  const params = new URLSearchParams({
    apikey: API_KEY,
    city: city,
    size: 20,
    sort: "date,asc"
  });

  if (date) {
    params.set("startDateTime", `${date}T00:00:00Z`);
  }

  try {
    loadingIndicator.style.display = "block";
    const response = await fetch(`${BASE_URL}?${params}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data);
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    showError("Failed to fetch events. Please try again.");
    return null;
  } finally {
    loadingIndicator.style.display = "none";
  }
}

function showError(message) {
  eventGrid.innerHTML = `<div class="error-message">${message}</div>`;
}

// Add this to your existing index.js
function displayEvents(events) {
  eventGrid.innerHTML = events
    .map(
      (event) => `
        <div class="event-card" data-event-id="${event.id}">
            ${
              event.images?.[0]?.url
                ? `<img src="${event.images[0].url}" alt="${event.name}">`
                : '<div class="image-placeholder">No Image Available</div>'
            }
            <h3>${event.name}</h3>
            <p>Date: ${new Date(
              event.dates.start.dateTime
            ).toLocaleDateString()}</p>
            <p>Venue: ${
              event._embedded?.venues?.[0]?.name || "Unknown venue"
            }</p>
        </div>
    `
    )
    .join("");

  // Add click handlers to event cards
  document.querySelectorAll(".event-card").forEach((card) => {
    card.addEventListener("click", () => {
      const eventId = card.dataset.eventId;
      window.location.href = `event.html?eventId=${eventId}`;
    });
  });
}

async function handleSearch() {
  const city = cityInput.value.trim();
  const date = dateInput.value;

  if (!city) {
    showError("Please enter a city");
    return;
  }

  const response = await fetchEvents(city, date);

  if (response && response._embedded?.events) {
    displayEvents(response._embedded.events);
  } else {
    showError("No events found for this search");
  }
}

// Event Listeners
searchButton.addEventListener("click", handleSearch);

// Added enter key support
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSearch();
});
dateInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSearch();
});

// Sample featured events data (will be replaced with real API calls)
const sampleFeaturedEvents = {
  art: {
    name: "Modern Art Exhibition",
    date: "2025-04-15",
    venue: "City Art Museum",
    image: "https://example.com/art.jpg"
  },
  music: {
    name: "Jazz Night Festival",
    date: "2025-04-20",
    venue: "Downtown Arena",
    image: "https://example.com/music.jpg"
  },
  sports: {
    name: "Marathon Championship",
    date: "2025-04-25",
    venue: "Central Stadium",
    image: "https://example.com/sports.jpg"
  }
};

// Sample weather data (will be replaced with real API calls)
const sampleWeather = [
  {
    city: "New York",
    temp: "12°C",
    condition: "Partly Cloudy",
    icon: "⛅"
  },
  {
    city: "London",
    temp: "8°C",
    condition: "Rainy",
    icon: "🌧️"
  },
  {
    city: "Tokyo",
    temp: "18°C",
    condition: "Sunny",
    icon: "☀️"
  }
];

function displayFeaturedEvents() {
  const featuredGrid = document.getElementById("featuredEvents");
  featuredGrid.innerHTML = Object.values(sampleFeaturedEvents)
    .map(
      (event) => `
        <div class="featured-event-card">
            <div class="image-placeholder">
                ${
                  event.image
                    ? `<img src="${event.image}" alt="${event.name}">`
                    : "Featured Event"
                }
            </div>
            <div class="featured-event-content">
                <h4>${event.name}</h4>
                <p>${new Date(event.date).toLocaleDateString()}</p>
                <p>${event.venue}</p>
            </div>
        </div>
    `
    )
    .join("");
}

function displayWeather() {
  const weatherGrid = document.getElementById("weatherGrid");
  weatherGrid.innerHTML = sampleWeather
    .map(
      (city) => `
        <div class="weather-card">
            <h3>${city.city}</h3>
            <div class="weather-icon">${city.icon}</div>
            <p>${city.temp}</p>
            <p>${city.condition}</p>
        </div>
    `
    )
    .join("");
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  displayFeaturedEvents();
  displayWeather();
});
