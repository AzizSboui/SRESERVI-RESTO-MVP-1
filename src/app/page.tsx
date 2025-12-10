import { restaurants } from '@/lib/data';
import RestaurantCard from '@/components/restaurant-card';
import { ChatBot } from '@/components/chat-bot';

export default function Home() {
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

        <section>
          <h2 className="text-3xl font-bold font-headline mb-8">
            Restaurants à Proximité
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>
      </div>
      <ChatBot />
    </>
  );
}
