import { Job } from "@/data/jobs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck, ExternalLink, Eye } from "lucide-react";
import { getScoreColor } from "@/lib/match-score";
import { JobStatus, allStatuses, statusColor } from "@/hooks/use-job-status";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onToggleSave: (id: number) => void;
  onView: (job: Job) => void;
  matchScore?: number;
  status: JobStatus;
  onStatusChange: (id: number, status: JobStatus) => void;
}

const sourceBadgeClass: Record<string, string> = {
  LinkedIn: "bg-primary/10 text-primary border-primary/20",
  Naukri: "bg-success/15 text-success border-success/30",
  Indeed: "bg-warning/15 text-warning border-warning/30",
};

const formatPosted = (days: number) => {
  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
};

const JobCard = ({ job, isSaved, onToggleSave, onView, matchScore, status, onStatusChange }: JobCardProps) => {
  return (
    <Card className="transition-calm hover:shadow-md">
      <CardContent className="p-3 flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-body font-serif font-semibold text-foreground leading-tight">
              {job.title}
            </h3>
            <p className="text-caption text-muted-foreground">{job.company}</p>
          </div>
          <div className="flex items-center gap-0.5 shrink-0">
            {matchScore !== undefined && (
              <Badge variant="outline" className={`text-small font-medium ${getScoreColor(matchScore)}`}>
                {matchScore}%
              </Badge>
            )}
            <Badge variant="outline" className={`text-small ${sourceBadgeClass[job.source]}`}>
              {job.source}
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1 text-caption text-muted-foreground">
          <span>{job.location}</span>
          <span>·</span>
          <span>{job.mode}</span>
          <span>·</span>
          <span>{job.experience === "Fresher" ? "Fresher" : `${job.experience} yrs`}</span>
        </div>

        <p className="text-caption font-medium text-foreground">{job.salaryRange}</p>

        <div className="flex items-center justify-between pt-1 border-t border-border">
          <div className="flex items-center gap-1">
            <span className="text-small text-muted-foreground">{formatPosted(job.postedDaysAgo)}</span>
            <Select value={status} onValueChange={(v) => onStatusChange(job.id, v as JobStatus)}>
              <SelectTrigger className={`h-6 text-small px-1.5 w-auto min-w-[90px] ${statusColor[status]}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                {allStatuses.map((s) => (
                  <SelectItem key={s} value={s} className="text-small">{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => onView(job)}>
              <Eye className="h-[16px] w-[16px]" />
              <span className="hidden sm:inline">View</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleSave(job.id)}
              className={isSaved ? "text-primary" : ""}
            >
              {isSaved ? <BookmarkCheck className="h-[16px] w-[16px]" /> : <Bookmark className="h-[16px] w-[16px]" />}
              <span className="hidden sm:inline">{isSaved ? "Saved" : "Save"}</span>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-[16px] w-[16px]" />
                <span className="hidden sm:inline">Apply</span>
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
