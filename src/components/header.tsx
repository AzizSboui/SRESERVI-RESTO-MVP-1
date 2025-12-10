import Link from 'next/link';
import { Utensils } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-card shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-headline font-bold text-primary"
          >
            <Utensils className="h-7 w-7" />
            <span>DineEase</span>
          </Link>
          {/* Future navigation items can go here */}
        </div>
      </div>
    </header>
  );
}
