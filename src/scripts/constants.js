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
      "Dubai", "Singapore", "Sydney", "Los Angeles", 
      "Berlin" , "Barcelona", "Rome", "Amsterdam",
      "Toronto", "Hong Kong", "San Francisco", "Chicago",
      "Madrid", "Bangkok", "Istanbul", "Mumbai", "Mexico City",
      "Rio de Janeiro", "Cape Town", "Seoul", "Buenos Aires", "Tel Aviv",
      "Cairo", "Moscow", "Lisbon", "Vienna", "Zurich", "Blantyre", "Brisbane",
      "Copenhagen", "Dublin", "Helsinki", "Kuala Lumpur", "Lima", "Manila",
      "Nairobi", "Oslo", "Prague", "Stockholm", "Tallinn", "Warsaw", "Budapest",
      "Athens", "Hanoi", "Jakarta", "Santiago", "Colombo", "Lagos", "Accra",
      "Addis Ababa", "Tunis", "Algiers", "Casablanca", "Abu Dhabi", "Doha", "Lilongwe",
      "Port Moresby", "Wellington", "Suva", "Apia", "Nassau", "Kingston", "Port-au-Prince",
      "Havana", "San Juan", "Guatemala City", "Tegucigalpa", "Managua", "Asunción"
    ]
  },
  ACCESSIBILITY: {
    ALT_TEXTS: {
      EVENT: "Event image for",
      WEATHER: "Weather icon showing"
    }
  }
};