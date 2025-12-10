'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Lock, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function CheckoutPage() {
  const router = useRouter();
  const [reservationDetails, setReservationDetails] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const details = localStorage.getItem('reservationDetails');
    if (details) {
      setReservationDetails(JSON.parse(details));
    } else {
      router.push('/');
    }
    setIsLoading(false);
  }, [router]);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      localStorage.removeItem('reservationDetails');
      router.push('/confirmation');
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        <Skeleton className="h-10 w-3/4 mx-auto mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
                <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                 <CardContent className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Skeleton className="h-10 w-full" />
                </CardFooter>
            </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold font-headline text-center mb-8">
        Confirm Your Reservation
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Reservation Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-medium">{reservationDetails.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time:</span>
              <span className="font-medium">{reservationDetails.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Party Size:</span>
              <span className="font-medium">
                {reservationDetails.partySize} guests
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Table:</span>
              <span className="font-medium">
                {reservationDetails.tableId.split('-')[1]}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg">
              <span className="font-semibold">Reservation Fee:</span>
              <span className="font-bold text-primary">$10.00</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard /> Payment Details
            </CardTitle>
            <CardDescription>A small fee to secure your table.</CardDescription>
          </CardHeader>
          <form onSubmit={handlePayment}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  placeholder="•••• •••• •••• ••••"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry</Label>
                  <Input id="expiry" placeholder="MM/YY" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="•••" required />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-stretch space-y-4">
              <Button
                type="submit"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                disabled={isProcessing}
              >
                {isProcessing && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isProcessing ? 'Processing...' : 'Pay & Confirm'}
              </Button>
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> Secure Payment
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
