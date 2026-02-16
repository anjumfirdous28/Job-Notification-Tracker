import { ShieldCheck } from "lucide-react";

const Proof = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-3 text-center">
      <ShieldCheck className="h-10 w-10 text-muted-foreground/50 mb-4" />
      <h1 className="text-display font-serif text-foreground">Proof of Work</h1>
      <p className="text-body text-muted-foreground mt-2 max-w-[420px]">
        Build artifacts and verification evidence will be collected here.
      </p>
    </main>
  );
};

export default Proof;
