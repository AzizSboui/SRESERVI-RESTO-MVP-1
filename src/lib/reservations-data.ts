export type Reservation = {
  id: string;
  restaurantName: string;
  clientName: string;
  date: string;
  time: string;
  partySize: number;
  status: 'Pending' | 'Accepted' | 'Declined';
};

export const initialReservations: Reservation[] = [
  {
    id: 'RES-001',
    restaurantName: 'La Cuillère Dorée',
    clientName: 'Alice Martin',
    date: '2024-08-15',
    time: '20:00',
    partySize: 2,
    status: 'Pending',
  },
  {
    id: 'RES-002',
    restaurantName: 'Épices de Safran',
    clientName: 'Bob Dupont',
    date: '2024-08-16',
    time: '19:30',
    partySize: 4,
    status: 'Pending',
  },
  {
    id: 'RES-003',
    restaurantName: 'Bistro Verde',
    clientName: 'Carla Dubois',
    date: '2024-08-16',
    time: '20:30',
    partySize: 3,
    status: 'Accepted',
  },
    {
    id: 'RES-004',
    restaurantName: 'Tokyo Table',
    clientName: 'David Petit',
    date: '2024-08-17',
    time: '21:00',
    partySize: 2,
    status: 'Pending',
  },
  {
    id: 'RES-005',
    restaurantName: 'Le Festin Gourmand',
    clientName: 'Eva Lefebvre',
    date: '2024-08-18',
    time: '12:00',
    partySize: 5,
    status: 'Declined',
  },
];
