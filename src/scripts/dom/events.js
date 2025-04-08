import { DOM } from "../constants";

export const showError = (message) => {
  DOM.eventGrid.innerHTML = `<div class="error-message">${message}</div>`;
};

export const displayEvents = (events) => {
  DOM.eventGrid.innerHTML = events.map(event => `
    <div class="event-card" data-event-id="${event.id}">
      ${event.images?.[0]?.url ? 
        `<img src="${event.images[0].url}" alt="${event.name}">` : 
        '<div class="image-placeholder">No Image Available</div>'}
      <h3>${event.name}</h3>
      <p>${new Date(event.dates.start.dateTime).toLocaleDateString()}</p>
      <p>${event._embedded?.venues?.[0]?.name || "Unknown venue"}</p>
    </div>
  `).join("");

  // Add click handlers
  document.querySelectorAll(".event-card").forEach(card => {
    card.addEventListener("click", () => {
      window.location.href = `event.html?eventId=${card.dataset.eventId}`;
    });
  });
};