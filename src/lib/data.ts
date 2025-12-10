import type { Restaurant } from './types';

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'The Gilded Spoon',
    cuisine: 'Modern European',
    rating: 4.8,
    reviewCount: 250,
    imageUrl: 'https://picsum.photos/seed/restaurant1/600/400',
    imageHint: 'elegant dining',
    address: '123 Luxury Lane, Metropolis',
    description:
      'An exquisite dining experience featuring the finest seasonal ingredients, curated by our world-renowned chef. The Gilded Spoon offers a journey for your taste buds in a setting of unparalleled elegance.',
    menu: [
      {
        id: 'm1-1',
        name: 'Seared Scallops',
        description: 'With saffron risotto and asparagus foam.',
        price: 24,
        category: 'Appetizer',
      },
      {
        id: 'm1-2',
        name: 'Filet Mignon',
        description: '8oz center-cut with truffle mashed potatoes.',
        price: 55,
        category: 'Main Course',
      },
      {
        id: 'm1-3',
        name: 'Deconstructed Tiramisu',
        description: 'Espresso gel, mascarpone cream, and cocoa nibs.',
        price: 15,
        category: 'Dessert',
      },
    ],
    tables: [
      { id: 't1-1', seats: 2, isAvailable: true },
      { id: 't1-2', seats: 4, isAvailable: false },
      { id: 't1-3', seats: 4, isAvailable: true },
      { id: 't1-4', seats: 6, isAvailable: true },
    ],
  },
  {
    id: '2',
    name: 'Saffron Spice',
    cuisine: 'Authentic Indian',
    rating: 4.6,
    reviewCount: 412,
    imageUrl: 'https://picsum.photos/seed/restaurant2/600/400',
    imageHint: 'indian food',
    address: '456 Spice Route, Metropolis',
    description:
      'Explore the vibrant flavors of India at Saffron Spice. Our menu is a rich tapestry of traditional dishes and contemporary creations, all prepared with authentic spices and time-honored techniques.',
    menu: [
      {
        id: 'm2-1',
        name: 'Vegetable Samosa',
        description: 'Crispy pastry filled with spiced potatoes and peas.',
        price: 9,
        category: 'Appetizer',
      },
      {
        id: 'm2-2',
        name: 'Chicken Tikka Masala',
        description: 'Grilled chicken in a creamy tomato sauce.',
        price: 22,
        category: 'Main Course',
      },
      {
        id: 'm2-3',
        name: 'Gulab Jamun',
        description: 'Milk solids dumplings in sweet syrup.',
        price: 8,
        category: 'Dessert',
      },
    ],
    tables: [
      { id: 't2-1', seats: 2, isAvailable: true },
      { id: 't2-2', seats: 4, isAvailable: true },
      { id: 't2-3', seats: 4, isAvailable: true },
      { id: 't2-4', seats: 8, isAvailable: false },
    ],
  },
  {
    id: '3',
    name: 'Bistro Verde',
    cuisine: 'Italian Trattoria',
    rating: 4.7,
    reviewCount: 320,
    imageUrl: 'https://picsum.photos/seed/restaurant3/600/400',
    imageHint: 'italian pasta',
    address: '789 Olive Street, Metropolis',
    description:
      'A cozy corner of Italy in the heart of the city. Bistro Verde serves classic Italian comfort food, from handmade pasta to wood-fired pizzas, in a warm and inviting atmosphere.',
    menu: [
      {
        id: 'm3-1',
        name: 'Bruschetta al Pomodoro',
        description: 'Toasted bread with fresh tomatoes, garlic, and basil.',
        price: 12,
        category: 'Appetizer',
      },
      {
        id: 'm3-2',
        name: 'Spaghetti Carbonara',
        description: 'Classic recipe with pancetta, egg, and pecorino.',
        price: 25,
        category: 'Main Course',
      },
      {
        id: 'm3-3',
        name: 'Panna Cotta',
        description: 'With a wild berry coulis.',
        price: 11,
        category: 'Dessert',
      },
    ],
    tables: [
      { id: 't3-1', seats: 2, isAvailable: false },
      { id: 't3-2', seats: 2, isAvailable: true },
      { id: 't3-3', seats: 4, isAvailable: true },
      { id: 't3-4', seats: 4, isAvailable: true },
    ],
  },
  {
    id: '4',
    name: 'Tokyo Table',
    cuisine: 'Japanese Sushi',
    rating: 4.9,
    reviewCount: 550,
    imageUrl: 'https://picsum.photos/seed/restaurant4/600/400',
    imageHint: 'sushi platter',
    address: '101 Sakura Blvd, Metropolis',
    description:
      'Experience the art of sushi at Tokyo Table. Our master chefs use only the freshest fish, sourced daily, to create traditional and innovative rolls that will delight your senses.',
    menu: [
      {
        id: 'm4-1',
        name: 'Edamame',
        description: 'Steamed and lightly salted soybeans.',
        price: 7,
        category: 'Appetizer',
      },
      {
        id: 'm4-2',
        name: 'Dragon Roll',
        description: 'Eel and cucumber topped with avocado.',
        price: 18,
        category: 'Main Course',
      },
      {
        id: 'm4-3',
        name: 'Mochi Ice Cream',
        description: 'Assorted flavors of Japanese ice cream.',
        price: 9,
        category: 'Dessert',
      },
    ],
    tables: [
      { id: 't4-1', seats: 2, isAvailable: true },
      { id: 't4-2', seats: 2, isAvailable: true },
      { id: 't4-3', seats: 4, isAvailable: true },
      { id: 't4-4', seats: 4, isAvailable: false },
    ],
  },
];

export const getRestaurantById = (id: string | number) => {
  return restaurants.find((r) => r.id === String(id));
};
