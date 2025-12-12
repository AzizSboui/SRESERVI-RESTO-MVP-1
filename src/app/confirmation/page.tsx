'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ConfirmationPage() {
  const [reservationId, setReservationId] = useState<string | null>(null);

  useEffect(() => {
    // Generate ID on client to avoid hydration mismatch
    setReservationId(
      `DINE-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
    );
  }, []);

  if (!reservationId) {
    return (
        <div className="container mx-auto max-w-lg px-4 sm:px-6 lg:px-8 py-20 text-center">
            <Card className="shadow-2xl">
                <CardHeader className="items-center">
                    <Skeleton className="w-16 h-16 rounded-full mb-4" />
                    <Skeleton className="h-8 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-6">
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-6 w-3/4" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
            </Card>
        </div>
    );
  }

  return (
    <div className="container mx-auto max-w-lg px-4 sm:px-6 lg:px-8 py-20 text-center">
      <Card className="shadow-2xl animate-in fade-in-50 zoom-in-95">
        <CardHeader className="items-center">
          <Clock className="w-16 h-16 text-accent mb-4" />
          <CardTitle className="text-3xl font-headline">
            Demande de réservation envoyée !
          </CardTitle>
          <CardDescription>
            Votre demande est en cours de traitement par le restaurant.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <p className="font-mono text-lg text-primary bg-primary/10 px-4 py-2 rounded-md">
            ID: {reservationId}
          </p>
          <p className="text-muted-foreground">
            Vous recevrez une confirmation (avec votre code QR) dès que l'administrateur aura validé votre demande.
            Dans une application réelle, cette page se mettrait à jour automatiquement.
          </p>
        </CardContent>
        <CardFooter className="flex-col sm:flex-row gap-2">
          <Button asChild className="w-full">
            <Link href="/">Retour à l'accueil</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
