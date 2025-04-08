export const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';
const API_KEY = import.meta.env.PUBLIC_TICKETMASTER_API_KEY;

export async function fetchEvents(city, date) {
  const params = new URLSearchParams({
    apikey: API_KEY,
    city: city,
    size: 20,
    sort: 'date,asc'
  });

  if (date) params.set('startDateTime', `${date}T00:00:00Z`);

  try {
    const response = await fetch(`${BASE_URL}?${params}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}