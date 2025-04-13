import { DOM, CONFIG } from "../constants";
import { getFirstValidImage, showError } from "../utils/helpers";

export const displayFeaturedEvents = async (events) => {
  try {
    // Show loading state
    DOM.featuredEvents.innerHTML = `
      <div class="loading">
        <div class="spinner"></div>
        Loading featured events...
      </div>
    `;

    // Validate events data
    if (!events?.length) {
      throw new Error("No featured events available");
    }

    // Build featured events HTML
    const featuredHTML = events.map(event => {
      const venue = event._embedded?.venues?.[0] || {};
      const altText = `${CONFIG.ACCESSIBILITY.ALT_TEXTS.EVENT} ${event.name}`;
      const imageUrl = getFirstValidImage(event.images, 400); // Minimum width 400px

      return `
        <article class="featured-event-card">
          <img src="${imageUrl}" 
               alt="${altText}"
               loading="lazy"
               width="400"
               height="225">
          <div class="featured-event-content">
            <h3>${event.name}</h3>
            <p>${new Date(event.dates.start.localDate).toLocaleDateString()}</p>
            <p>${venue.name || 'Location TBA'}</p>
          </div>
        </article>
      `;
    }).join("");

    // Smooth transition
    DOM.featuredEvents.style.opacity = 0;
    setTimeout(() => {
      DOM.featuredEvents.innerHTML = featuredHTML;
      DOM.featuredEvents.style.opacity = 1;
    }, 300);

  } catch (error) {
    console.error("Featured events error:", error);
    showError(
      "Featured events unavailable. Try refreshing the page.",
      DOM.featuredEvents
    );
  }
};