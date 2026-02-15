import { Badge } from "@/components/ui/badge";

type Status = "Not Started" | "In Progress" | "Shipped";

interface TopBarProps {
  projectName?: string;
  currentStep?: number;
  totalSteps?: number;
  status?: Status;
}

const statusStyles: Record<Status, string> = {
  "Not Started": "bg-muted text-muted-foreground border-border",
  "In Progress": "bg-warning/15 text-warning border-warning/30",
  "Shipped": "bg-success/15 text-success border-success/30",
};

const TopBar = ({
  projectName = "KodNest Premium",
  currentStep = 1,
  totalSteps = 5,
  status = "Not Started",
}: TopBarProps) => {
  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-3 h-[48px] font-sans">
      <span className="text-caption font-medium text-foreground tracking-tight">
        {projectName}
      </span>

      <span className="text-small text-muted-foreground">
        Step {currentStep} / {totalSteps}
      </span>

      <Badge
        variant="outline"
        className={`text-small font-medium px-1.5 py-0.5 rounded-sm ${statusStyles[status]}`}
      >
        {status}
      </Badge>
    </header>
  );
};

export default TopBar;
