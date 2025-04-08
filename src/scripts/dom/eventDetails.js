import { DOM } from "../constants";

export const displayEventDetails = (event) => {
  const venue = event._embedded?.venues?.[0] || {};
  DOM.eventDetails.innerHTML = `
    <div class="event-header">
      <h1>${event.name}</h1>
      ${event.images?.[0]?.url ? 
        `<img src="${event.images[0].url}" alt="${event.name}">` : 
        '<div class="image-placeholder">No Image Available</div>'}
    </div>
    <div class="details-section">
      <h2>📅 Date & Time</h2>
      <p>${new Date(event.dates.start.dateTime).toLocaleString()}</p>
    </div>
    <div class="details-section">
      <h2>🏟️ Venue Information</h2>
      <p>${venue.name || "Venue name not available"}</p>
      <p>${venue.address?.line1 || ""}</p>
      <p>${venue.city?.name}, ${venue.state?.stateCode} ${venue.postalCode}</p>
      ${venue.generalInfo?.generalRule ? `
        <div class="venue-rules">
          <h3>Venue Rules:</h3>
          <p>${venue.generalInfo.generalRule}</p>
        </div>` : ''}
    </div>
    <div class="details-section">
      <h2>🎟️ Tickets</h2>
      <a href="${event.url}" target="_blank" class="ticket-button">
        Purchase Tickets
      </a>
      ${event.priceRanges ? `
        <p>Price: $${event.priceRanges[0].min} - $${event.priceRanges[0].max}</p>` : ''}
    </div>
  `;
};