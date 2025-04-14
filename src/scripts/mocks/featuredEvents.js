export const mockFeaturedEvents = [
    {
      id: "mock1",
      name: "Summer Music Festival",
      dates: {
        start: {
          localDate: "2024-07-15",
          dateTime: "2024-07-15T19:00:00Z"
        }
      },
      images: [
        {
          url: "./images/summer-festival.jpg",
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
          localDate: "2024-07-20",
          dateTime: "2024-07-20T10:00:00Z"
        }
      },
      images: [
        {
          url: "./images/art-gallery-event.jpg", // Local path
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
          localDate: "2024-08-05",
          dateTime: "2024-08-05T18:30:00Z"
        }
      },
      images: [
        {
          url: "./images/basketball-event.jpg",
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
          localDate: "2024-09-10",
          dateTime: "2024-09-10T20:00:00Z"
        }
      },
      images: [
        {
          url: "./images/shakespeare-event.jpg",
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