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
import { Calendar } from '@/components/ui/calendar';
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
import { format } from 'date-fns';

interface ReservationPanelProps {
  tables: Table[];
}

export function ReservationPanel({ tables }: ReservationPanelProps) {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>('');
  const [partySize, setPartySize] = useState<string>('');
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

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
        title: 'Incomplete Reservation',
        description: 'Please select a date, time, party size, and table.',
        variant: 'destructive',
      });
      return;
    }
    // In a real app, we'd save this to a DB and go to checkout with a reservation ID.
    // For now, we'll just navigate to a generic checkout page.
    localStorage.setItem(
      'reservationDetails',
      JSON.stringify({
        date: format(date, 'PPP'),
        time,
        partySize,
        tableId: selectedTable.id,
        tableSeats: selectedTable.seats,
      })
    );
    router.push('/checkout');
  };

  return (
    <Card className="sticky top-24 shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Make a Reservation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="date" className="flex items-center gap-2">
            <CalendarIcon /> Select Date
          </Label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="time" className="flex items-center gap-2">
              <Clock /> Time
            </Label>
            <Select onValueChange={setTime} value={time}>
              <SelectTrigger id="time">
                <SelectValue placeholder="Select time" />
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
              <Users /> Party Size
            </Label>
            <Select onValueChange={handlePartySizeChange} value={partySize}>
              <SelectTrigger id="party-size">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(8)].map((_, i) => (
                  <SelectItem key={i + 1} value={`${i + 1}`}>
                    {i + 1} person{i > 0 ? 's' : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Armchair /> Choose a Table
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
                  {table.seats} seats
                </span>
              </Button>
            ))}
            {partySize && availableTables.length === 0 && (
              <p className="col-span-3 text-sm text-muted-foreground p-4 text-center border rounded-md">
                No available tables for the selected party size.
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
          Proceed to Payment
        </Button>
      </CardFooter>
    </Card>
  );
}
