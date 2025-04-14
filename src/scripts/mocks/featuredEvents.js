export const mockFeaturedEvents = [
    {
      id: "mock1",
      name: "Summer Music Festival",
      dates: {
        start: {
          localDate: "2025-04-19",
          dateTime: "2025-04-19T19:00:00Z"
        }
      },
      images: [
        {
          url: "https://raw.githubusercontent.com/mkatopola/event-explorer/main/src/public/images/summer-festival.jpg",
          width: 800
        }
      ],
      _embedded: {
        venues: [
          {
            name: "Central Park", 
            city: { name: "New York" }
          }
        ]
      }
    },
    {
      id: "mock2",
      name: "Art Gallery Exhibition",
      dates: {
        start: {
          localDate: "2025-04-27",
          dateTime: "2025-04-27T10:00:00Z"
        }
      },
      images: [
        {
          url: "https://raw.githubusercontent.com/mkatopola/event-explorer/main/src/public/images/art-gallery-event.jpg",
          width: 800
        }
      ],
      _embedded: {
        venues: [
          {
            name: "Modern Art Museum",
            city: { name: "Chicago" }
          }
        ]
      }
    },
    {
      id: "mock3",
      name: "City Basketball Championship",
      dates: {
        start: {
          localDate: "2025-05-03",
          dateTime: "2025-05-03T18:30:00Z"
        }
      },
      images: [
        {
          url: "https://raw.githubusercontent.com/mkatopola/event-explorer/main/src/public/images/basketball-event.jpg",
          width: 800
        }
      ],
      _embedded: {
        venues: [
          {
            name: "Downtown Arena",
            city: { name: "Los Angeles" }
          }
        ]
      }
    },
    {
      id: "mock4",
      name: "Shakespeare in the Park",
      dates: {
        start: {
          localDate: "2025-05-11",
          dateTime: "2025-05-11T20:00:00Z"
        }
      },
      images: [
        {
          url: "https://raw.githubusercontent.com/mkatopola/event-explorer/main/src/public/images/shakespeare-event.jpg",
          width: 800
        }
      ],
      _embedded: {
        venues: [
          {
            name: "Riverside Park Amphitheater",
            city: { name: "London" }
          }
        ]
      }
    }
  ];