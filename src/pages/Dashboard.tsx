import { Briefcase } from "lucide-react";

const Dashboard = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-3 text-center">
      <Briefcase className="h-10 w-10 text-muted-foreground/50 mb-4" />
      <h1 className="text-display font-serif text-foreground">Dashboard</h1>
      <p className="text-body text-muted-foreground mt-2 max-w-[420px]">
        No jobs yet. In the next step, you will load a realistic dataset.
      </p>
    </main>
  );
};

export default Dashboard;
