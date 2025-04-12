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

// Configuration
export const CONFIG = {
  TICKETMASTER: {
    API_KEY: process.env.PUBLIC_TICKETMASTER_API_KEY,
    BASE_URL: "https://app.ticketmaster.com/discovery/v2/events",
    FEATURED_PARAMS: {
      size: 20,
      sort: "date,asc",
      startDateTime: new Date().toISOString(),
      endDateTime: new Date(Date.now() + 92 * 24 * 60 * 60 * 1000).toISOString() // +3 months
    },
    MAX_PAST_DAYS: 0,
    FUTURE_DAYS: 90
  },
  OPENWEATHER: {
    API_KEY: process.env.PUBLIC_OPENWEATHER_API_KEY,
    BASE_URL: "https://api.openweathermap.org/data/2.5/forecast",
    ICON_URL: "https://openweathermap.org/img/wn",
    CITIES: [
      "New York", "London", "Tokyo", 
      "Paris", "Dubai", "Singapore",
      "Sydney", "Los Angeles", "Berlin",
      "Rome", "Mumbai", "Toronto"
    ]
  }
};