export default function Footer() {
  return (
    <footer className="bg-card mt-auto py-6">
      <div className="container mx-auto text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} DineEase. All rights reserved.</p>
      </div>
    </footer>
  );
}
