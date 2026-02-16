import { Bookmark } from "lucide-react";

const Saved = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-3 text-center">
      <Bookmark className="h-10 w-10 text-muted-foreground/50 mb-4" />
      <h1 className="text-display font-serif text-foreground">Saved Jobs</h1>
      <p className="text-body text-muted-foreground mt-2 max-w-[420px]">
        Jobs you bookmark will appear here for quick access.
      </p>
    </main>
  );
};

export default Saved;
