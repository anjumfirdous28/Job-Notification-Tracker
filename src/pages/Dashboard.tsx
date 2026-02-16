import { useState, useMemo } from "react";
import { jobs, Job } from "@/data/jobs";
import { useSavedJobs } from "@/hooks/use-saved-jobs";
import JobCard from "@/components/JobCard";
import JobDetailModal from "@/components/JobDetailModal";
import FilterBar, { Filters } from "@/components/FilterBar";

const defaultFilters: Filters = {
  keyword: "",
  location: "all",
  mode: "all",
  experience: "all",
  source: "all",
  sort: "latest",
};

const Dashboard = () => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [viewJob, setViewJob] = useState<Job | null>(null);
  const { toggleSave, isSaved } = useSavedJobs();

  const filtered = useMemo(() => {
    let result = [...jobs];

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

    if (filters.sort === "latest") result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
    else if (filters.sort === "oldest") result.sort((a, b) => b.postedDaysAgo - a.postedDaysAgo);
    else if (filters.sort === "company") result.sort((a, b) => a.company.localeCompare(b.company));

    return result;
  }, [filters]);

  return (
    <main className="px-3 py-4 max-w-[960px] mx-auto">
      <div className="mb-3">
        <h1 className="text-display font-serif text-foreground">Dashboard</h1>
        <p className="text-body text-muted-foreground mt-0.5">
          {filtered.length} job{filtered.length !== 1 ? "s" : ""} found
        </p>
      </div>

      <FilterBar filters={filters} onChange={setFilters} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
        {filtered.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isSaved={isSaved(job.id)}
            onToggleSave={toggleSave}
            onView={setViewJob}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-5 text-center">
          <p className="text-body text-muted-foreground">No jobs match your filters.</p>
          <button
            onClick={() => setFilters(defaultFilters)}
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
