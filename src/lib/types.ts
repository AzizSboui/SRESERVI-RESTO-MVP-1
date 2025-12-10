export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Appetizer' | 'Main Course' | 'Dessert' | 'Beverage';
}

export interface Table {
  id: string;
  seats: number;
  isAvailable: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  imageHint: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  description: string;
  menu: MenuItem[];
  tables: Table[];
}
