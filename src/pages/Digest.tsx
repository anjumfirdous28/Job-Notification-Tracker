import { Mail } from "lucide-react";

const Digest = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-3 text-center">
      <Mail className="h-10 w-10 text-muted-foreground/50 mb-4" />
      <h1 className="text-display font-serif text-foreground">Daily Digest</h1>
      <p className="text-body text-muted-foreground mt-2 max-w-[420px]">
        Your curated 9AM digest will be displayed here once configured.
      </p>
    </main>
  );
};

export default Digest;
