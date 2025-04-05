const API_KEY = process.env.PUBLIC_TICKETMASTER_API_KEY;

async function fetchEventDetails(eventId) {
  try {
    const response = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${API_KEY}`
    );

    if (!response.ok) throw new Error("Event not found");
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    document.getElementById("eventDetails").innerHTML = `
            <div class="error-message">Error loading event details. Please try again later.</div>
        `;
    return null;
  }
}

function displayEventDetails(event) {
  const venue = event._embedded?.venues?.[0] || {};
  const detailsDiv = document.getElementById("eventDetails");

  detailsDiv.innerHTML = `
        <div class="event-header">
            <h1>${event.name}</h1>
            ${
              event.images?.[0]?.url
                ? `<img src="${event.images[0].url}" alt="${event.name}" class="event-image">`
                : '<div class="image-placeholder">No Image Available</div>'
            }
        </div>

        <div class="details-section">
            <h2>📅 Date & Time</h2>
            <p>${new Date(event.dates.start.dateTime).toLocaleString()}</p>
        </div>

        <div class="details-section">
            <h2>🏟️ Venue Information</h2>
            <p><strong>${venue.name || "Venue name not available"}</strong></p>
            <p>${venue.address?.line1 || ""}</p>
            <p>${venue.city?.name}, ${venue.state?.stateCode} ${
    venue.postalCode
  }</p>
            ${
              venue.generalInfo?.generalRule
                ? `
                <div class="venue-rules">
                    <h3>Venue Rules:</h3>
                    <p>${venue.generalInfo.generalRule}</p>
                </div>
            `
                : ""
            }
        </div>

        <div class="details-section ticket-section">
            <h2>🎟️ Tickets</h2>
            <a href="${event.url}" target="_blank" class="ticket-button">
                Purchase Tickets on Ticketmaster
            </a>
            ${
              event.priceRanges
                ? `
                <div class="price-range">
                    <p>Price Range: $${event.priceRanges[0].min} - $${event.priceRanges[0].max}</p>
                </div>
            `
                : ""
            }
        </div>
    `;
}

// Initialize the details page
(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get("eventId");

  if (!eventId) {
    document.getElementById("eventDetails").innerHTML = `
            <div class="error-message">No event specified. Please return to the main page.</div>
        `;
    return;
  }

  const eventData = await fetchEventDetails(eventId);
  if (eventData) displayEventDetails(eventData);
})();
