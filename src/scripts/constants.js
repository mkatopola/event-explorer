// DOM Elements
export const DOM = {
  searchButton: document.getElementById("searchButton"),
  cityInput: document.getElementById("cityInput"),
  dateInput: document.getElementById("dateInput"),
  eventGrid: document.getElementById("eventGrid"),
  loadingIndicator: document.getElementById("loading"),
  featuredEvents: document.getElementById("featuredEvents"),
  weatherGrid: document.getElementById("weatherGrid"),
  eventDetails: document.getElementById("eventDetails")
};

// API Configuration
export const CONFIG = {
  TICKETMASTER: {
    API_KEY: process.env.PUBLIC_TICKETMASTER_API_KEY,
    BASE_URL: "https://app.ticketmaster.com/discovery/v2/events",
    MAX_PAST_DAYS: 0
  },
  OPENWEATHER: {
    API_KEY: process.env.PUBLIC_OPENWEATHER_API_KEY,
    CURRENT_WEATHER_URL: "https://api.openweathermap.org/data/2.5/weather",
    FORECAST_URL: "https://api.openweathermap.org/data/2.5/forecast",
    ICON_URL: "https://openweathermap.org/img/wn",
    CITIES: [
      "New York", "London", "Tokyo", "Paris", 
      "Dubai", "Singapore", "Sydney", "Los Angeles"
    ]
  },
  ACCESSIBILITY: {
    ALT_TEXTS: {
      EVENT: "Event image for",
      WEATHER: "Weather icon showing"
    }
  }
};