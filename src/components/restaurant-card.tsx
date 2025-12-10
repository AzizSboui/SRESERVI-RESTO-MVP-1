import type { Restaurant } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { Badge } from './ui/badge';

type RestaurantCardProps = {
  restaurant: Restaurant;
};

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link href={`/restaurants/${restaurant.id}`} className="group block">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="object-cover"
              data-ai-hint={restaurant.imageHint}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <CardTitle className="font-headline text-xl mb-2 truncate">
            {restaurant.name}
          </CardTitle>
          <Badge variant="secondary" className="mb-2">
            {restaurant.cuisine}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Star className="w-4 h-4 mr-1 text-accent fill-accent" />
            <span>{restaurant.rating}</span>
            <span className="mx-1">·</span>
            <span>({restaurant.reviewCount} reviews)</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            aria-label={`View details for ${restaurant.name}`}
            tabIndex={-1}
          >
            View Details
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
