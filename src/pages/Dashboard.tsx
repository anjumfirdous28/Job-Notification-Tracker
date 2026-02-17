import { useState, useMemo } from "react";
import { jobs, Job } from "@/data/jobs";
import { useSavedJobs } from "@/hooks/use-saved-jobs";
import { usePreferences } from "@/hooks/use-preferences";
import { useJobStatus, JobStatus } from "@/hooks/use-job-status";
import { computeMatchScore } from "@/lib/match-score";
import JobCard from "@/components/JobCard";
import JobDetailModal from "@/components/JobDetailModal";
import FilterBar, { Filters } from "@/components/FilterBar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const defaultFilters: Filters = {
  keyword: "",
  location: "all",
  mode: "all",
  experience: "all",
  source: "all",
  sort: "latest",
  status: "all",
};

const extractSalaryNum = (s: string): number => {
  const match = s.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

const Dashboard = () => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [viewJob, setViewJob] = useState<Job | null>(null);
  const [showOnlyMatches, setShowOnlyMatches] = useState(false);
  const { toggleSave, isSaved } = useSavedJobs();
  const { preferences, hasPreferences } = usePreferences();
  const { getStatus, setStatus } = useJobStatus();
  const navigate = useNavigate();

  const handleStatusChange = (id: number, status: JobStatus) => {
    setStatus(id, status);
    if (status !== "Not Applied") {
      toast({ title: `Status updated: ${status}` });
    }
  };

  const scoredJobs = useMemo(() => {
    return jobs.map((job) => ({
      ...job,
      matchScore: hasPreferences ? computeMatchScore(job, preferences) : 0,
    }));
  }, [preferences, hasPreferences]);

  const filtered = useMemo(() => {
    let result = [...scoredJobs];

    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(kw) ||
          j.company.toLowerCase().includes(kw)
      );
    }
    if (filters.location !== "all") result = result.filter((j) => j.location === filters.location);
    if (filters.mode !== "all") result = result.filter((j) => j.mode === filters.mode);
    if (filters.experience !== "all") result = result.filter((j) => j.experience === filters.experience);
    if (filters.source !== "all") result = result.filter((j) => j.source === filters.source);
    if (filters.status !== "all") result = result.filter((j) => getStatus(j.id) === filters.status);

    if (showOnlyMatches && hasPreferences) {
      result = result.filter((j) => j.matchScore >= preferences.minMatchScore);
    }

    if (filters.sort === "latest") result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
    else if (filters.sort === "oldest") result.sort((a, b) => b.postedDaysAgo - a.postedDaysAgo);
    else if (filters.sort === "company") result.sort((a, b) => a.company.localeCompare(b.company));
    else if (filters.sort === "matchScore") result.sort((a, b) => b.matchScore - a.matchScore);
    else if (filters.sort === "salary") result.sort((a, b) => extractSalaryNum(b.salaryRange) - extractSalaryNum(a.salaryRange));

    return result;
  }, [filters, scoredJobs, showOnlyMatches, hasPreferences, preferences.minMatchScore, getStatus]);

  return (
    <main className="px-3 py-4 max-w-[960px] mx-auto">
      {!hasPreferences && (
        <div className="flex items-center gap-1 p-2 mb-2 rounded-md border border-warning/30 bg-warning/10">
          <AlertCircle className="h-[16px] w-[16px] text-warning shrink-0" />
          <p className="text-caption text-foreground">
            Set your preferences to activate intelligent matching.
          </p>
          <Button variant="link" size="sm" onClick={() => navigate("/settings")} className="ml-auto shrink-0">
            Go to Settings
          </Button>
        </div>
      )}

      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <h1 className="text-display font-serif text-foreground">Dashboard</h1>
          <p className="text-body text-muted-foreground mt-0.5">
            {filtered.length} job{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
        {hasPreferences && (
          <div className="flex items-center gap-1 pt-1">
            <Switch checked={showOnlyMatches} onCheckedChange={setShowOnlyMatches} id="match-toggle" />
            <Label htmlFor="match-toggle" className="text-caption cursor-pointer whitespace-nowrap">
              Above threshold
            </Label>
          </div>
        )}
      </div>

      <FilterBar filters={filters} onChange={setFilters} showScoreSort={hasPreferences} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
        {filtered.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isSaved={isSaved(job.id)}
            onToggleSave={toggleSave}
            onView={setViewJob}
            matchScore={hasPreferences ? job.matchScore : undefined}
            status={getStatus(job.id)}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-5 text-center">
          <p className="text-body text-muted-foreground">
            {showOnlyMatches
              ? "No roles match your criteria. Adjust filters or lower threshold."
              : "No jobs match your filters."}
          </p>
          <button
            onClick={() => { setFilters(defaultFilters); setShowOnlyMatches(false); }}
            className="text-caption text-primary mt-1 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      <JobDetailModal job={viewJob} open={!!viewJob} onOpenChange={(open) => !open && setViewJob(null)} />
    </main>
  );
};

export default Dashboard;
