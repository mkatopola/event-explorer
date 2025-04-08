export function showError(message, container) {
    container.innerHTML = `<div class="error-message">${message}</div>`;
  }
  
  export function displayEvents(events, container) {
    container.innerHTML = events.map(event => `
      <div class="event-card" data-event-id="${event.id}">
        ${event.images?.[0]?.url ? 
          `<img src="${event.images[0].url}" alt="${event.name}">` : 
          '<div class="image-placeholder">No Image Available</div>'}
        <h3>${event.name}</h3>
        <p>Date: ${new Date(event.dates.start.dateTime).toLocaleDateString()}</p>
        <p>Venue: ${event._embedded?.venues?.[0]?.name || 'Unknown venue'}</p>
      </div>
    `).join('');
  }
  
  export function setupEventCardListeners() {
    document.querySelectorAll('.event-card').forEach(card => {
      card.addEventListener('click', () => {
        const eventId = card.dataset.eventId;
        window.location.href = `event.html?eventId=${eventId}`;
      });
    });
  }