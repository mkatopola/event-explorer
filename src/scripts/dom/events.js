import { DOM, CONFIG } from "../constants";
import {
  formatLocalDate,
  getFirstValidImage,
  showError
} from "../utils/helpers";

export const displayEvents = async (events) => {
  try {
    const validEvents = events.filter(
      (event) =>
        event.dates?.start?.dateTime &&
        new Date(event.dates.start.dateTime) >= new Date()
    );

    if (!validEvents.length) {
      showError("No upcoming events found", DOM.eventGrid);
      return;
    }

    DOM.eventGrid.innerHTML = validEvents
      .map((event) => {
        const venue = event._embedded?.venues?.[0] || {};
        const altText = `${CONFIG.ACCESSIBILITY.ALT_TEXTS.EVENT} ${event.name}`;

        return `
        <article class="event-card" 
                 data-event-id="${event.id}"
                 role="button"
                 tabindex="0"
                 aria-label="View details for ${event.name}">
          <img src="${getFirstValidImage(event.images)}" 
               alt="${altText}"
               loading="lazy">
          <div class="event-content">
            <h3>${event.name}</h3>
            <p class="event-date">
              ${formatLocalDate(
                event.dates.start.dateTime,
                venue.timezone || "UTC"
              )}
            </p>
            <p class="event-venue">${venue.name || "Venue TBA"}</p>
          </div>
        </article>
      `;
      })
      .join("");

    // In displayEvents function after rendering cards
    document.querySelectorAll(".event-card").forEach((card) => {
      card.addEventListener("click", () => {
        const eventId = card.dataset.eventId;
        // Using proper path for both dev and production
        window.location.href = `./event.html?eventId=${encodeURIComponent(
          eventId
        )}`;
      });

      // Added keyboard support
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          window.location.href = `./event.html?eventId=${encodeURIComponent(
            card.dataset.eventId
          )}`;
        }
      });
    });
  } catch (error) {
    showError("Failed to display events", DOM.eventGrid);
  }
};
