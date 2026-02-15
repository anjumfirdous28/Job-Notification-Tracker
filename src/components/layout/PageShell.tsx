import TopBar from "./TopBar";
import ContextHeader from "./ContextHeader";
import ProofFooter from "./ProofFooter";
import SecondaryPanel from "./SecondaryPanel";

interface PageShellProps {
  headline: string;
  subtext: string;
  children: React.ReactNode;
  projectName?: string;
  currentStep?: number;
  totalSteps?: number;
  status?: "Not Started" | "In Progress" | "Shipped";
}

const PageShell = ({
  headline,
  subtext,
  children,
  projectName,
  currentStep,
  totalSteps,
  status,
}: PageShellProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopBar
        projectName={projectName}
        currentStep={currentStep}
        totalSteps={totalSteps}
        status={status}
      />
      <ContextHeader headline={headline} subtext={subtext} />

      <div className="flex flex-1 overflow-hidden">
        {/* Primary Workspace — 70% */}
        <main className="flex-[7] overflow-y-auto p-3">
          {children}
        </main>

        {/* Secondary Panel — 30% */}
        <div className="flex-[3] overflow-y-auto">
          <SecondaryPanel />
        </div>
      </div>

      <ProofFooter />
    </div>
  );
};

export default PageShell;
