export default function Footer() {
  return (
    <footer className="bg-card mt-auto py-6">
      <div className="container mx-auto text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} ResRVI. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
