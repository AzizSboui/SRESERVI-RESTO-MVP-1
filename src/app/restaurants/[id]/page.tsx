import { getRestaurantById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ReservationPanel } from '@/components/reservation-panel';
import { MenuSection } from '@/components/menu-section';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const restaurant = getRestaurantById(params.id);
  if (!restaurant) {
    return {
      title: 'Restaurant Not Found',
    };
  }
  return {
    title: `${restaurant.name} - ResRVI`,
    description: restaurant.description,
  };
}

export default function RestaurantPage({ params }: { params: { id: string } }) {
  const restaurant = getRestaurantById(params.id);

  if (!restaurant) {
    notFound();
  }

  return (
    <>
      <section className="relative h-64 md:h-96 w-full mb-8">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className="object-cover"
          data-ai-hint={restaurant.imageHint}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 md:p-8 container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-white">
            {restaurant.name}
          </h1>
          <p className="text-lg text-gray-200 mt-2">{restaurant.cuisine}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90">
              <p>{restaurant.description}</p>
            </div>
            <Separator className="my-8" />
            <div className="flex flex-wrap gap-x-6 gap-y-4 text-md text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-accent fill-accent" />
                <span>
                  {restaurant.rating} ({restaurant.reviewCount} reviews)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                <span>{restaurant.address}</span>
              </div>
            </div>

            <MenuSection menu={restaurant.menu} />
          </div>

          <div className="lg:col-span-1">
            <ReservationPanel tables={restaurant.tables} />
          </div>
        </div>
      </div>
    </>
  );
}
