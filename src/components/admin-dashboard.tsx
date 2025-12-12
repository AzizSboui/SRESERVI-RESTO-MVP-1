'use client';

import { useState } from 'react';
import { initialReservations, type Reservation } from '@/lib/reservations-data';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function AdminDashboard() {
  const [reservations, setReservations] =
    useState<Reservation[]>(initialReservations);
  const { toast } = useToast();

  const handleStatusChange = (id: string, newStatus: 'Accepted' | 'Declined') => {
    setReservations((prevReservations) =>
      prevReservations.map((res) =>
        res.id === id ? { ...res, status: newStatus } : res
      )
    );
    toast({
        title: `Réservation ${newStatus === 'Accepted' ? 'Acceptée' : 'Refusée'}`,
        description: `Le statut de la réservation a été mis à jour.`,
    });
  };

  const getStatusVariant = (status: Reservation['status']) => {
    switch (status) {
      case 'Accepted':
        return 'default';
      case 'Declined':
        return 'destructive';
      case 'Pending':
      default:
        return 'secondary';
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold font-headline text-center mb-8">
        Panneau d'Administration
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Gestion des Réservations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Restaurant</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date & Heure</TableHead>
                <TableHead>Personnes</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell className="font-medium">
                    {reservation.restaurantName}
                  </TableCell>
                  <TableCell>{reservation.clientName}</TableCell>
                  <TableCell>
                    {reservation.date} à {reservation.time}
                  </TableCell>
                  <TableCell>{reservation.partySize}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(reservation.status)}>
                      {
                        {
                          Pending: 'En attente',
                          Accepted: 'Acceptée',
                          Declined: 'Refusée',
                        }[reservation.status]
                      }
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    {reservation.status === 'Pending' && (
                      <>
                        <Button
                          size="icon"
                          variant="outline"
                          className="text-green-600 hover:bg-green-100 hover:text-green-700"
                          onClick={() => handleStatusChange(reservation.id, 'Accepted')}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="text-red-600 hover:bg-red-100 hover:text-red-700"
                          onClick={() => handleStatusChange(reservation.id, 'Declined')}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
