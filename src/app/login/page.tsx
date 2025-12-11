'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous intégrerez votre logique d'appel à l'API MongoDB
    console.log('Formulaire de connexion soumis');
    alert('Logique de connexion à implémenter.');
    // Exemple de redirection après succès:
    // router.push('/'); 
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-12rem)] py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold font-headline">
            Connexion
          </CardTitle>
          <CardDescription>
            Accédez à votre compte pour gérer vos réservations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Adresse e-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="nom@exemple.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Se connecter
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Pas encore de compte ?{' '}
              <Link
                href="/signup"
                className="font-medium text-primary hover:underline"
              >
                Inscrivez-vous
              </Link>
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-4">
            <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                    Ou continuer sans compte
                    </span>
                </div>
            </div>
            <Button variant="outline" className="w-full" asChild>
                <Link href="/">Rester déconnecté</Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
