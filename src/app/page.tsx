'use client';

import { useState, useMemo } from 'react';
import { restaurants } from '@/lib/data';
import RestaurantCard from '@/components/restaurant-card';
import { ChatBot } from '@/components/chat-bot';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRestaurants = useMemo(() => {
    if (!searchQuery) {
      return restaurants;
    }
    return restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <section className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold font-headline text-primary tracking-tight">
            Trouvez Votre Prochain Repas
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez et réservez une table dans les meilleurs restaurants près de chez vous. Votre expérience culinaire inoubliable n'est qu'à un clic.
          </p>
        </section>

        <section className="mb-12">
          <div className="flex max-w-md mx-auto">
            <div className="relative w-full">
               <Input
                type="text"
                placeholder="Chercher un restaurant par son nom..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold font-headline mb-8">
            {searchQuery ? 'Résultats de la recherche' : 'Restaurants à Proximité'}
          </h2>
          {filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          ) : (
             <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Aucun restaurant ne correspond à votre recherche.
                </p>
             </div>
          )}
        </section>
      </div>
      <ChatBot />
    </>
  );
}
