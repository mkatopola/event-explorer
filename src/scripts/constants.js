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

// Configuration and sample data
export const CONFIG = {
  API_KEY: process.env.PUBLIC_TICKETMASTER_API_KEY,
  BASE_URL: "https://app.ticketmaster.com/discovery/v2/events",
  SAMPLE_FEATURED: {
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
  },
  SAMPLE_WEATHER: [
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
  ]
};