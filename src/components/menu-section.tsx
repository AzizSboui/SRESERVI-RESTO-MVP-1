import type { MenuItem } from '@/lib/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Utensils } from 'lucide-react';

interface MenuSectionProps {
  menu: MenuItem[];
}

export function MenuSection({ menu }: MenuSectionProps) {
  const categories = [
    { key: 'Appetizer', name: 'Entrées' },
    { key: 'Main Course', name: 'Plats principaux' },
    { key: 'Dessert', name: 'Desserts' },
    { key: 'Beverage', name: 'Boissons' },
  ] as const;

  return (
    <section>
      <h2 className="text-3xl font-bold font-headline mb-6 flex items-center gap-3">
        <Utensils className="w-8 h-8 text-primary" />
        Menu
      </h2>
      <div className="space-y-8">
        {categories.map((category) => {
          const items = menu.filter((item) => item.category === category.key);
          if (items.length === 0) return null;

          return (
            <div key={category.key}>
              <h3 className="text-2xl font-headline font-semibold mb-4 text-primary/90">
                {category.name}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {items.map((item) => (
                  <Card key={item.id} className="bg-card/50">
                    <CardHeader>
                      <CardTitle className="text-lg flex justify-between items-baseline">
                        <span>{item.name}</span>
                        <span className="text-base font-sans font-bold text-accent">
                          {item.price.toFixed(2)} TND
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
