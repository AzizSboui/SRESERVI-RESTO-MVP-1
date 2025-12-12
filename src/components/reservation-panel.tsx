'use client';

import { useState, useMemo, useEffect } from 'react';
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
import { Calendar as CalendarIcon, Clock, Users, Armchair, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { format, getDaysInMonth, getYear, getMonth, set } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface ReservationPanelProps {
  tables: Table[];
}

// SIMULATION: Fausse liste de réservations existantes.
// Dans une vraie application, ceci viendrait d'une base de données.
const existingReservations = [
    { tableId: 't2-2', time: '19:00' },
    { tableId: 't3-3', time: '20:00' },
    { tableId: 't1-4', time: '19:30' },
    { tableId: 't4-1', time: '20:30' },
    { tableId: 't4-2', time: '20:30' },
];

export function ReservationPanel({ tables }: ReservationPanelProps) {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>('');
  const [partySize, setPartySize] = useState<string>('');
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState<number | undefined>();

  const currentYear = getYear(new Date());
  
  const months = useMemo(() => {
    const monthArray = [];
    const today = new Date();
    for (let i = 0; i < 12; i++) {
        const monthDate = set(today, { month: i });
        monthArray.push({
            value: getMonth(monthDate),
            label: format(monthDate, 'MMMM', { locale: fr }),
        });
    }
    return monthArray;
  }, []);

  const daysInSelectedMonth = useMemo(() => {
    return getDaysInMonth(new Date(currentYear, selectedMonth));
  }, [currentYear, selectedMonth]);

  useEffect(() => {
    if (selectedDay !== undefined) {
      const newDate = new Date(currentYear, selectedMonth, selectedDay);
      setDate(newDate);
    }
  }, [selectedMonth, selectedDay, currentYear]);

  const handleMonthChange = (value: string) => {
    setSelectedMonth(parseInt(value));
    setSelectedDay(undefined); // Reset day when month changes
    setDate(undefined);
  };

  const handleDayChange = (value: string) => {
    setSelectedDay(parseInt(value));
  };
  
  const handlePartySizeChange = (value: string) => {
    setPartySize(value);
    setSelectedTable(null); // Reset table selection when party size changes
  };

  const handleTimeChange = (value: string) => {
    setTime(value);
    setSelectedTable(null); // Reset table selection when time changes
  };

  const availableTables = useMemo(() => {
    // 1. Filtre de base : tables structurellement disponibles
    const generallyAvailableTables = tables.filter(table => table.isAvailable);

    // 2. Si aucune heure n'est choisie, on ne peut pas filtrer plus
    if (!time) {
        return generallyAvailableTables;
    }
    
    // 3. Filtre les tables qui ne sont PAS dans les réservations existantes pour l'heure choisie
    return generallyAvailableTables.filter(table => {
        const isReserved = existingReservations.some(
            reservation => reservation.tableId === table.id && reservation.time === time
        );
        return !isReserved; // Retourne true si la table n'est PAS réservée
    });
  }, [tables, time]);

  const filteredTablesForPartySize = useMemo(() => {
    if (!partySize) {
      return availableTables;
    }
    return availableTables.filter(table => table.seats >= parseInt(partySize));
  }, [availableTables, partySize]);


  const handleReservation = () => {
    if (!date || !time || !partySize || !selectedTable) {
      toast({
        title: 'Réservation incomplète',
        description: 'Veuillez sélectionner une date, une heure, un nombre de personnes et une table.',
        variant: 'destructive',
      });
      return;
    }
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
  
  return (
    <Card className="sticky top-24 shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Faire une réservation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <CalendarIcon /> Choisir la date
          </Label>
          <div className="grid grid-cols-2 gap-4">
             <Select onValueChange={handleMonthChange} value={String(selectedMonth)}>
                <SelectTrigger>
                  <SelectValue placeholder="Mois" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={String(month.value)}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
             <Select onValueChange={handleDayChange} value={selectedDay ? String(selectedDay) : ''} disabled={selectedMonth === undefined}>
                <SelectTrigger>
                  <SelectValue placeholder="Jour" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(daysInSelectedMonth)].map((_, i) => {
                      const day = i + 1;
                      return (
                          <SelectItem key={day} value={String(day)}>
                              {day}
                          </SelectItem>
                      )
                  })}
                </SelectContent>
              </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="time" className="flex items-center gap-2">
              <Clock /> Heure
            </Label>
            <Select onValueChange={handleTimeChange} value={time}>
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
            {filteredTablesForPartySize.map((table) => (
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
            {time && partySize && filteredTablesForPartySize.length === 0 && (
              <Alert variant="destructive" className="col-span-3">
                 <AlertCircle className="h-4 w-4" />
                 <AlertTitle>Complet ou indisponible</AlertTitle>
                 <AlertDescription>
                   Aucune table n'est disponible pour cette heure et cette taille de groupe. Veuillez essayer un autre créneau ou un autre nombre de personnes.
                 </AlertDescription>
               </Alert>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleReservation}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          disabled={!date || !time || !partySize || !selectedTable}
        >
          Voir le résumé
        </Button>
      </CardFooter>
    </Card>
  );
}
