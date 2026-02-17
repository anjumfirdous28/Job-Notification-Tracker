import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ShieldCheck, ClipboardCopy, RotateCcw, HelpCircle, CheckCircle2, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CHECKLIST_KEY = "jobTrackerTestChecklist";
const LINKS_KEY = "jobTrackerProofLinks";

interface TestItem {
  id: string;
  label: string;
  hint: string;
}

const testItems: TestItem[] = [
  { id: "prefs", label: "Preferences persist after refresh", hint: "Save preferences on /settings, refresh the page, confirm they're still there." },
  { id: "score", label: "Match score calculates correctly", hint: "Set preferences with known keywords, check score badges on /dashboard." },
  { id: "toggle", label: "\"Show only matches\" toggle works", hint: "Enable the toggle on /dashboard and verify low-score jobs are hidden." },
  { id: "save", label: "Save job persists after refresh", hint: "Save a job, refresh, check /saved page." },
  { id: "apply", label: "Apply opens in new tab", hint: "Click Apply on a job card and confirm a new tab opens." },
  { id: "status", label: "Status update persists after refresh", hint: "Change a job's status, refresh, confirm it's retained." },
  { id: "statusFilter", label: "Status filter works correctly", hint: "Change statuses, then filter by that status on /dashboard." },
  { id: "digestGen", label: "Digest generates top 10 by score", hint: "Generate a digest on /digest and verify top 10 ordering." },
  { id: "digestPersist", label: "Digest persists for the day", hint: "Generate digest, refresh, confirm it loads from storage." },
  { id: "noErrors", label: "No console errors on main pages", hint: "Open browser console, navigate all pages, check for errors." },
];

const steps = [
  "App Skeleton",
  "Realistic Dataset",
  "Match Scoring",
  "Digest Engine",
  "Status Tracking",
  "Test Checklist",
  "Proof & Submission",
  "Ship",
];

const isValidUrl = (s: string) => {
  try {
    new URL(s);
    return true;
  } catch {
    return false;
  }
};

const Proof = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem(CHECKLIST_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const [links, setLinks] = useState<{ lovable: string; github: string; deployed: string }>(() => {
    try {
      const stored = localStorage.getItem(LINKS_KEY);
      return stored ? JSON.parse(stored) : { lovable: "", github: "", deployed: "" };
    } catch {
      return { lovable: "", github: "", deployed: "" };
    }
  });

  const passedCount = testItems.filter((t) => checked[t.id]).length;
  const allPassed = passedCount === testItems.length;
  const allLinksValid = isValidUrl(links.lovable) && isValidUrl(links.github) && isValidUrl(links.deployed);
  const canShip = allPassed && allLinksValid;

  const shipStatus = useMemo(() => {
    if (canShip) return "Shipped";
    if (passedCount > 0 || links.lovable || links.github || links.deployed) return "In Progress";
    return "Not Started";
  }, [canShip, passedCount, links]);

  const statusBadgeClass: Record<string, string> = {
    "Not Started": "text-muted-foreground border-border",
    "In Progress": "text-warning border-warning/30 bg-warning/10",
    Shipped: "text-success border-success/30 bg-success/10",
  };

  const toggleCheck = (id: string) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    localStorage.setItem(CHECKLIST_KEY, JSON.stringify(next));
  };

  const updateLink = (key: "lovable" | "github" | "deployed", value: string) => {
    const next = { ...links, [key]: value };
    setLinks(next);
    localStorage.setItem(LINKS_KEY, JSON.stringify(next));
  };

  const resetChecklist = () => {
    setChecked({});
    localStorage.removeItem(CHECKLIST_KEY);
    toast({ title: "Test status reset" });
  };

  const copySubmission = () => {
    const text = `Job Notification Tracker — Final Submission

Lovable Project:
${links.lovable}

GitHub Repository:
${links.github}

Live Deployment:
${links.deployed}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced`;
    navigator.clipboard.writeText(text).then(() => {
      toast({ title: "Submission copied to clipboard" });
    });
  };

  return (
    <main className="px-3 py-4 max-w-[640px] mx-auto flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h1 className="text-display font-serif text-foreground">Proof of Work</h1>
          <p className="text-body text-muted-foreground mt-0.5">
            Project 1 — Job Notification Tracker
          </p>
        </div>
        <Badge variant="outline" className={`text-caption ${statusBadgeClass[shipStatus]}`}>
          {shipStatus}
        </Badge>
      </div>

      {/* Step Completion Summary */}
      <Card className="border">
        <CardContent className="p-3 flex flex-col gap-1.5">
          <h2 className="text-title font-serif text-foreground border-b border-border pb-1">Step Completion</h2>
          <div className="grid grid-cols-2 gap-1">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center gap-1 text-caption">
                <CheckCircle2 className={`h-[14px] w-[14px] ${i < 7 ? "text-success" : "text-muted-foreground/40"}`} />
                <span className={i < 7 ? "text-foreground" : "text-muted-foreground"}>
                  {i + 1}. {step}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Test Checklist */}
      <Card className="border">
        <CardContent className="p-3 flex flex-col gap-2">
          <div className="flex items-center justify-between border-b border-border pb-1.5">
            <div className="flex items-center gap-1">
              <ShieldCheck className="h-[16px] w-[16px] text-muted-foreground" />
              <h2 className="text-title font-serif text-foreground">Test Checklist</h2>
            </div>
            <span className={`text-caption font-medium ${allPassed ? "text-success" : "text-foreground"}`}>
              {passedCount} / {testItems.length} passed
            </span>
          </div>

          {!allPassed && (
            <div className="flex items-center gap-1 p-1.5 rounded-md bg-warning/10 border border-warning/20">
              <AlertTriangle className="h-[14px] w-[14px] text-warning shrink-0" />
              <p className="text-small text-foreground">Resolve all issues before shipping.</p>
            </div>
          )}

          <div className="flex flex-col gap-1">
            {testItems.map((item) => (
              <label key={item.id} className="flex items-center gap-1.5 cursor-pointer select-none py-0.5">
                <Checkbox
                  checked={!!checked[item.id]}
                  onCheckedChange={() => toggleCheck(item.id)}
                />
                <span className={`text-caption flex-1 transition-calm ${checked[item.id] ? "text-foreground" : "text-muted-foreground"}`}>
                  {item.label}
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-[14px] w-[14px] text-muted-foreground/50 shrink-0 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="left" className="max-w-[240px] text-small">
                    {item.hint}
                  </TooltipContent>
                </Tooltip>
              </label>
            ))}
          </div>

          <Button variant="ghost" size="sm" onClick={resetChecklist} className="self-start mt-1">
            <RotateCcw className="h-[14px] w-[14px]" />
            Reset Test Status
          </Button>
        </CardContent>
      </Card>

      {/* Artifact Collection */}
      <Card className="border">
        <CardContent className="p-3 flex flex-col gap-2">
          <h2 className="text-title font-serif text-foreground border-b border-border pb-1">Submission Links</h2>

          <div className="flex flex-col gap-0.5">
            <Label htmlFor="lovable-link" className="text-caption">Lovable Project Link</Label>
            <Input
              id="lovable-link"
              placeholder="https://lovable.dev/projects/..."
              value={links.lovable}
              onChange={(e) => updateLink("lovable", e.target.value)}
              className={links.lovable && !isValidUrl(links.lovable) ? "border-destructive" : ""}
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <Label htmlFor="github-link" className="text-caption">GitHub Repository Link</Label>
            <Input
              id="github-link"
              placeholder="https://github.com/..."
              value={links.github}
              onChange={(e) => updateLink("github", e.target.value)}
              className={links.github && !isValidUrl(links.github) ? "border-destructive" : ""}
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <Label htmlFor="deployed-link" className="text-caption">Deployed URL</Label>
            <Input
              id="deployed-link"
              placeholder="https://your-app.vercel.app"
              value={links.deployed}
              onChange={(e) => updateLink("deployed", e.target.value)}
              className={links.deployed && !isValidUrl(links.deployed) ? "border-destructive" : ""}
            />
          </div>

          <Button
            onClick={copySubmission}
            disabled={!canShip}
            className="mt-1 self-start"
          >
            <ClipboardCopy className="h-[14px] w-[14px]" />
            Copy Final Submission
          </Button>

          {!canShip && (
            <p className="text-small text-muted-foreground">
              {!allPassed && "Pass all tests"}{!allPassed && !allLinksValid && " and "}{!allLinksValid && "provide valid links"} to enable submission.
            </p>
          )}
        </CardContent>
      </Card>

      {canShip && (
        <p className="text-caption text-success text-center font-medium">
          Project 1 Shipped Successfully.
        </p>
      )}
    </main>
  );
};

export default Proof;
