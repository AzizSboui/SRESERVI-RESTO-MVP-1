'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { Table } from '@/lib/types';
import { Calendar as CalendarIcon, Clock, Users, Armchair } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { format, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ReservationPanelProps {
  tables: Table[];
}

export function ReservationPanel({ tables }: ReservationPanelProps) {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>('');
  const [partySize, setPartySize] = useState<string>('');
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  const handleDateChange = (value: string) => {
    setDate(new Date(value));
  };
  
  const handlePartySizeChange = (value: string) => {
    setPartySize(value);
    setSelectedTable(null); // Reset table selection when party size changes
  };

  const availableTables = tables.filter(
    (table) =>
      table.isAvailable && (!partySize || table.seats >= parseInt(partySize))
  );

  const handleReservation = () => {
    if (!date || !time || !partySize || !selectedTable) {
      toast({
        title: 'Réservation incomplète',
        description: 'Veuillez sélectionner une date, une heure, un nombre de personnes et une table.',
        variant: 'destructive',
      });
      return;
    }
    // In a real app, we'd save this to a DB and go to checkout with a reservation ID.
    // For now, we'll just navigate to a generic checkout page.
    localStorage.setItem(
      'reservationDetails',
      JSON.stringify({
        date: format(date, 'PPP', { locale: fr }),
        time,
        partySize,
        tableId: selectedTable.id,
        tableSeats: selectedTable.seats,
      })
    );
    router.push('/checkout');
  };
  
  const upcomingDays = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));

  return (
    <Card className="sticky top-24 shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Faire une réservation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="date-select" className="flex items-center gap-2">
            <CalendarIcon /> Choisir la date
          </Label>
          <Select onValueChange={handleDateChange} value={date?.toISOString()}>
            <SelectTrigger id="date-select">
              <SelectValue placeholder="Sélectionner une date" />
            </SelectTrigger>
            <SelectContent>
              {upcomingDays.map((day) => (
                <SelectItem key={day.toISOString()} value={day.toISOString()}>
                  {format(day, 'eeee dd MMMM', { locale: fr })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="time" className="flex items-center gap-2">
              <Clock /> Heure
            </Label>
            <Select onValueChange={setTime} value={time}>
              <SelectTrigger id="time">
                <SelectValue placeholder="Choisir l'heure" />
              </SelectTrigger>
              <SelectContent>
                {['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'].map(
                  (t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="party-size" className="flex items-center gap-2">
              <Users /> Personnes
            </Label>
            <Select onValueChange={handlePartySizeChange} value={partySize}>
              <SelectTrigger id="party-size">
                <SelectValue placeholder="Nombre" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(8)].map((_, i) => (
                  <SelectItem key={i + 1} value={`${i + 1}`}>
                    {i + 1} personne{i > 0 ? 's' : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Armchair /> Choisir une table
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {availableTables.map((table) => (
              <Button
                key={table.id}
                variant={selectedTable?.id === table.id ? 'default' : 'outline'}
                onClick={() => setSelectedTable(table)}
                className="flex flex-col h-16"
                disabled={!partySize || !time || !date}
              >
                <span>Table {table.id.split('-')[1]}</span>
                <span className="text-xs text-muted-foreground">
                  {table.seats} places
                </span>
              </Button>
            ))}
            {partySize && availableTables.length === 0 && (
              <p className="col-span-3 text-sm text-muted-foreground p-4 text-center border rounded-md">
                Aucune table disponible pour ce nombre de personnes.
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleReservation}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Voir le résumé
        </Button>
      </CardFooter>
    </Card>
  );
}
