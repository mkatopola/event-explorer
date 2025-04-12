import { DOM, CONFIG } from "../constants";
import { getFirstValidImage } from "../utils/helpers";

export const displayFeaturedEvents = async (events) => {
  try {
    DOM.featuredEvents.innerHTML = events.map(event => {
      const venue = event._embedded?.venues?.[0] || {};
      const altText = `${CONFIG.ACCESSIBILITY.ALT_TEXTS.EVENT} ${event.name}`;

      return `
        <article class="featured-event-card" 
                 role="article"
                 aria-labelledby="featured-${event.id}">
          <img src="${getFirstValidImage(event.images)}" 
               alt="${altText}"
               loading="lazy">
          <div class="featured-event-content">
            <h4 id="featured-${event.id}">${event.name}</h4>
            <time datetime="${event.dates.start.localDate}">
              ${new Date(event.dates.start.localDate).toLocaleDateString()}
            </time>
            <p>${venue.name || 'Location TBA'}</p>
          </div>
        </article>
      `;
    }).join("");

  } catch (error) {
    DOM.featuredEvents.innerHTML = `
      <div class="error" role="alert">
        Currently unavailable to show featured events
      </div>
    `;
  }
};