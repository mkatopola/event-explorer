import { DOM, CONFIG } from "../constants";
import { fetchFeaturedEvents } from "../api/ticketmaster";

export const displayFeaturedEvents = async () => {
  try {
    // Show loading state
    DOM.featuredEvents.innerHTML = "<div class='loading'>Loading featured events...</div>";
    
    // Fetch and process events
    const events = await fetchFeaturedEvents();
    
    // Handle empty results
    if (events.length === 0) {
      DOM.featuredEvents.innerHTML = "<div class='error'>No featured events found today</div>";
      return;
    }

    // Render events
    DOM.featuredEvents.innerHTML = events.map(event => `
      <div class="featured-event-card">
        <img src="${event.images.find(img => img.width === 640)?.url || ''}" 
             alt="${event.name}">
        <div class="featured-event-content">
          <h4>${event.name}</h4>
          <p>${new Date(event.dates.start.localDate).toLocaleDateString()}</p>
          <p>${event._embedded?.venues?.[0]?.name || ''}</p>
        </div>
      </div>
    `).join("");

  } catch (error) {
    // Error handling
    console.error("Featured events error:", error);
    DOM.featuredEvents.innerHTML = "<div class='error'>Failed to load featured events</div>";
  }
};