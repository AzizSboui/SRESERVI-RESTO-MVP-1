import type { Restaurant } from './types';

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'La Cuillère Dorée',
    cuisine: 'Européenne Moderne',
    rating: 4.8,
    reviewCount: 250,
    imageUrl: 'https://picsum.photos/seed/restaurant1/600/400',
    imageHint: 'elegant dining',
    address: '123 Rue du Luxe, Métropole',
    description:
      "Une expérience culinaire exquise mettant en vedette les meilleurs ingrédients de saison, organisée par notre chef de renommée mondiale. La Cuillère Dorée offre un voyage pour vos papilles dans un cadre d'une élégance inégalée.",
    menu: [
      {
        id: 'm1-1',
        name: 'Coquilles Saint-Jacques poêlées',
        description: "Avec risotto au safran et écume d'asperges.",
        price: 72,
        category: 'Appetizer',
      },
      {
        id: 'm1-2',
        name: 'Filet Mignon',
        description: 'Filet de 225g avec purée de pommes de terre à la truffe.',
        price: 165,
        category: 'Main Course',
      },
      {
        id: 'm1-3',
        name: 'Tiramisu déstructuré',
        description: 'Gel d\'espresso, crème de mascarpone et éclats de cacao.',
        price: 45,
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
    name: 'Épices de Safran',
    cuisine: 'Indienne Authentique',
    rating: 4.6,
    reviewCount: 412,
    imageUrl: 'https://picsum.photos/seed/restaurant2/600/400',
    imageHint: 'indian food',
    address: '456 Route des Épices, Métropole',
    description:
      "Explorez les saveurs vibrantes de l'Inde à Épices de Safran. Notre menu est une riche tapisserie de plats traditionnels et de créations contemporaines, tous préparés avec des épices authentiques et des techniques ancestrales.",
    menu: [
      {
        id: 'm2-1',
        name: 'Samosa aux légumes',
        description: 'Pâtisserie croustillante farcie de pommes de terre épicées et de petits pois.',
        price: 27,
        category: 'Appetizer',
      },
      {
        id: 'm2-2',
        name: 'Poulet Tikka Masala',
        description: 'Poulet grillé dans une sauce crémeuse à la tomate.',
        price: 66,
        category: 'Main Course',
      },
      {
        id: 'm2-3',
        name: 'Gulab Jamun',
        description: 'Boulettes de lait solide dans un sirop sucré.',
        price: 24,
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
    cuisine: 'Trattoria Italienne',
    rating: 4.7,
    reviewCount: 320,
    imageUrl: 'https://picsum.photos/seed/restaurant3/600/400',
    imageHint: 'italian pasta',
    address: '789 Rue des Oliviers, Métropole',
    description:
      "Un coin d'Italie confortable au cœur de la ville. Le Bistro Verde sert une cuisine italienne réconfortante classique, des pâtes faites maison aux pizzas cuites au feu de bois, dans une atmosphère chaleureuse et accueillante.",
    menu: [
      {
        id: 'm3-1',
        name: 'Bruschetta al Pomodoro',
        description: 'Pain grillé avec des tomates fraîches, de l\'ail et du basilic.',
        price: 36,
        category: 'Appetizer',
      },
      {
        id: 'm3-2',
        name: 'Spaghetti Carbonara',
        description: 'Recette classique avec pancetta, œuf et pecorino.',
        price: 75,
        category: 'Main Course',
      },
      {
        id: 'm3-3',
        name: 'Panna Cotta',
        description: 'Avec un coulis de fruits des bois.',
        price: 33,
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
    cuisine: 'Sushi Japonais',
    rating: 4.9,
    reviewCount: 550,
    imageUrl: 'https://picsum.photos/seed/restaurant4/600/400',
    imageHint: 'sushi platter',
    address: '101 Boulevard Sakura, Métropole',
    description:
      "Découvrez l'art du sushi à Tokyo Table. Nos maîtres sushi n'utilisent que le poisson le plus frais, provenant du marché quotidien, pour créer des rouleaux traditionnels et innovants qui raviront vos sens.",
    menu: [
      {
        id: 'm4-1',
        name: 'Edamame',
        description: 'Graines de soja cuites à la vapeur et légèrement salées.',
        price: 21,
        category: 'Appetizer',
      },
      {
        id: 'm4-2',
        name: 'Dragon Roll',
        description: "Anguille et concombre recouverts d'avocat.",
        price: 54,
        category: 'Main Course',
      },
      {
        id: 'm4-3',
        name: 'Glace Mochi',
        description: 'Assortiment de saveurs de crème glacée japonaise.',
        price: 27,
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
