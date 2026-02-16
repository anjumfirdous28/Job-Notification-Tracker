import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] px-3 text-center">
      <h1 className="text-display font-serif text-foreground max-w-[600px]">
        Stop Missing The Right Jobs.
      </h1>
      <p className="text-body text-muted-foreground mt-3 max-w-[480px]">
        Precision-matched job discovery delivered daily at 9AM.
      </p>
      <Button className="mt-6" size="lg" onClick={() => navigate("/settings")}>
        Start Tracking
      </Button>
    </main>
  );
};

export default Index;
