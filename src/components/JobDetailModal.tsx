import { Job } from "@/data/jobs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface JobDetailModalProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const JobDetailModal = ({ job, open, onOpenChange }: JobDetailModalProps) => {
  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[520px] bg-card">
        <DialogHeader>
          <DialogTitle className="text-title font-serif">{job.title}</DialogTitle>
          <DialogDescription className="text-caption text-muted-foreground">
            {job.company} · {job.location} · {job.mode}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-1">
            <Badge variant="outline" className="text-small">{job.experience === "Fresher" ? "Fresher" : `${job.experience} yrs`}</Badge>
            <Badge variant="outline" className="text-small">{job.salaryRange}</Badge>
            <Badge variant="outline" className="text-small">{job.source}</Badge>
          </div>

          <div>
            <h4 className="text-caption font-medium text-foreground mb-0.5">Skills</h4>
            <div className="flex flex-wrap gap-0.5">
              {job.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-small">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-caption font-medium text-foreground mb-0.5">Description</h4>
            <p className="text-caption text-muted-foreground leading-relaxed">{job.description}</p>
          </div>

          <Button className="mt-1 self-start" asChild>
            <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
              Apply Now <ExternalLink className="h-[16px] w-[16px] ml-0.5" />
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;
