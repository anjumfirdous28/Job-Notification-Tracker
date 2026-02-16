import { jobs } from "@/data/jobs";
import { useSavedJobs } from "@/hooks/use-saved-jobs";
import JobCard from "@/components/JobCard";
import JobDetailModal from "@/components/JobDetailModal";
import { useState } from "react";
import { Job } from "@/data/jobs";
import { Bookmark } from "lucide-react";

const Saved = () => {
  const { savedIds, toggleSave, isSaved } = useSavedJobs();
  const [viewJob, setViewJob] = useState<Job | null>(null);

  const savedJobs = jobs.filter((j) => savedIds.includes(j.id));

  if (savedJobs.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[70vh] px-3 text-center">
        <Bookmark className="h-10 w-10 text-muted-foreground/50 mb-4" />
        <h1 className="text-display font-serif text-foreground">Saved Jobs</h1>
        <p className="text-body text-muted-foreground mt-2 max-w-[420px]">
          Jobs you bookmark will appear here for quick access.
        </p>
      </main>
    );
  }

  return (
    <main className="px-3 py-4 max-w-[960px] mx-auto">
      <div className="mb-3">
        <h1 className="text-display font-serif text-foreground">Saved Jobs</h1>
        <p className="text-body text-muted-foreground mt-0.5">
          {savedJobs.length} saved job{savedJobs.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {savedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isSaved={isSaved(job.id)}
            onToggleSave={toggleSave}
            onView={setViewJob}
          />
        ))}
      </div>

      <JobDetailModal job={viewJob} open={!!viewJob} onOpenChange={(open) => !open && setViewJob(null)} />
    </main>
  );
};

export default Saved;
