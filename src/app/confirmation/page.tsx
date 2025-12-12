'use client';
import Link from 'next/link';
import Image from 'next/image';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

export default function ConfirmationPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [reservationId, setReservationId] = useState<string | null>(null);

  useEffect(() => {
    // Generate ID on client to avoid hydration mismatch
    setReservationId(
      `DINE-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
    );
  }, []);

  const handleCancel = () => {
    toast({
      title: 'Réservation annulée',
      description: 'Votre réservation a été annulée avec succès.',
    });
    router.push('/');
  };

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
                    <Skeleton className="w-[200px] h-[200px] rounded-lg" />
                    <Skeleton className="h-8 w-1/2" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
            </Card>
        </div>
    );
  }
  
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    `Reservation ID: ${reservationId}`
  )}`;

  return (
    <div className="container mx-auto max-w-lg px-4 sm:px-6 lg:px-8 py-20 text-center">
      <Card className="shadow-2xl animate-in fade-in-50 zoom-in-95">
        <CardHeader className="items-center">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <CardTitle className="text-3xl font-headline">
            Réservation Confirmée !
          </CardTitle>
          <CardDescription>
            Votre table est réservée. Présentez ce code QR au restaurant.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <div className="p-4 bg-white rounded-lg">
            <Image
              src={qrCodeUrl}
              alt="QR Code de réservation"
              width={200}
              height={200}
              unoptimized
            />
          </div>
          <p className="font-mono text-lg text-primary bg-primary/10 px-4 py-2 rounded-md">
            {reservationId}
          </p>
          <p className="text-muted-foreground">
            Un e-mail de confirmation a été envoyé à votre adresse. Nous avons hâte de vous voir !
          </p>
        </CardContent>
        <CardFooter className="flex-col sm:flex-row gap-2">
          <Button asChild className="w-full">
            <Link href="/">Retour à l'accueil</Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="w-full">
                Annuler la réservation
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irréversible et annulera votre réservation de table.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Retour</AlertDialogCancel>
                <AlertDialogAction onClick={handleCancel}>
                  Confirmer l'annulation
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
}
