import { useState, useMemo, useCallback } from "react";
import { format } from "date-fns";
import { jobs } from "@/data/jobs";
import { usePreferences } from "@/hooks/use-preferences";
import { useJobStatus } from "@/hooks/use-job-status";
import { computeMatchScore } from "@/lib/match-score";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getScoreColor } from "@/lib/match-score";
import { statusColor } from "@/hooks/use-job-status";
import { Mail, Clipboard, ExternalLink, AlertCircle, Sparkles, Activity } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface DigestJob {
  id: number;
  title: string;
  company: string;
  location: string;
  experience: string;
  matchScore: number;
  applyUrl: string;
}

const DIGEST_KEY_PREFIX = "jobTrackerDigest_";
const getDigestKey = () => `${DIGEST_KEY_PREFIX}${format(new Date(), "yyyy-MM-dd")}`;

const Digest = () => {
  const { preferences, hasPreferences } = usePreferences();
  const { changes } = useJobStatus();
  const navigate = useNavigate();

  const [digestJobs, setDigestJobs] = useState<DigestJob[]>(() => {
    try {
      const stored = localStorage.getItem(getDigestKey());
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [generated, setGenerated] = useState(() => !!localStorage.getItem(getDigestKey()));

  const generateDigest = useCallback(() => {
    const topJobs = jobs
      .map((job) => ({ job, score: computeMatchScore(job, preferences) }))
      .sort((a, b) => b.score - a.score || a.job.postedDaysAgo - b.job.postedDaysAgo)
      .slice(0, 10)
      .map(({ job, score }) => ({
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        experience: job.experience,
        matchScore: score,
        applyUrl: job.applyUrl,
      }));

    localStorage.setItem(getDigestKey(), JSON.stringify(topJobs));
    setDigestJobs(topJobs);
    setGenerated(true);
    toast({ title: "Digest generated", description: "Your 9AM digest is ready." });
  }, [preferences]);

  const digestText = useMemo(() => {
    if (digestJobs.length === 0) return "";
    const today = format(new Date(), "MMMM d, yyyy");
    let text = `Top 10 Jobs For You — 9AM Digest\n${today}\n\n`;
    digestJobs.forEach((job, i) => {
      text += `${i + 1}. ${job.title} at ${job.company}\n`;
      text += `   ${job.location} · ${job.experience === "Fresher" ? "Fresher" : `${job.experience} yrs`} · Match: ${job.matchScore}%\n`;
      text += `   Apply: ${job.applyUrl}\n\n`;
    });
    text += "This digest was generated based on your preferences.";
    return text;
  }, [digestJobs]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(digestText).then(() => {
      toast({ title: "Copied to clipboard" });
    });
  }, [digestText]);

  const createEmailDraft = useCallback(() => {
    const subject = encodeURIComponent("My 9AM Job Digest");
    const body = encodeURIComponent(digestText);
    window.open(`mailto:?subject=${subject}&body=${body}`, "_self");
  }, [digestText]);

  // Recent status updates — match jobId to job data
  const recentUpdates = useMemo(() => {
    return changes.slice(0, 10).map((c) => {
      const job = jobs.find((j) => j.id === c.jobId);
      return { ...c, title: job?.title ?? "Unknown", company: job?.company ?? "" };
    });
  }, [changes]);

  if (!hasPreferences) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[70vh] px-3 text-center">
        <AlertCircle className="h-10 w-10 text-warning/60 mb-3" />
        <h1 className="text-display font-serif text-foreground">Daily Digest</h1>
        <p className="text-body text-muted-foreground mt-2 max-w-[420px]">
          Set preferences to generate a personalized digest.
        </p>
        <Button className="mt-3" onClick={() => navigate("/settings")}>
          Go to Settings
        </Button>
      </main>
    );
  }

  return (
    <main className="px-3 py-4 max-w-[640px] mx-auto">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <h1 className="text-display font-serif text-foreground">Daily Digest</h1>
          <p className="text-body text-muted-foreground mt-0.5">
            Your curated 9AM digest of top-matching roles.
          </p>
        </div>
      </div>

      {!generated ? (
        <div className="flex flex-col items-center py-5 text-center">
          <Sparkles className="h-10 w-10 text-muted-foreground/50 mb-3" />
          <p className="text-body text-muted-foreground mb-3">
            Generate today's digest to see your top 10 matched jobs.
          </p>
          <Button onClick={generateDigest}>
            Generate Today's 9AM Digest (Simulated)
          </Button>
          <p className="text-small text-muted-foreground/60 mt-2">
            Demo Mode: Daily 9AM trigger simulated manually.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <Card className="border">
            <CardContent className="p-3 flex flex-col gap-2">
              <div className="text-center border-b border-border pb-2">
                <h2 className="text-title font-serif text-foreground">Top 10 Jobs For You — 9AM Digest</h2>
                <p className="text-caption text-muted-foreground">{format(new Date(), "MMMM d, yyyy")}</p>
              </div>

              {digestJobs.length === 0 ? (
                <div className="py-4 text-center">
                  <p className="text-body text-muted-foreground">No matching roles today. Check again tomorrow.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-1.5">
                  {digestJobs.map((job, i) => (
                    <div key={job.id} className="flex items-center justify-between gap-2 py-1 border-b border-border/50 last:border-0">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="text-small text-muted-foreground">{i + 1}.</span>
                          <p className="text-caption font-serif font-semibold text-foreground truncate">{job.title}</p>
                        </div>
                        <p className="text-small text-muted-foreground">
                          {job.company} · {job.location} · {job.experience === "Fresher" ? "Fresher" : `${job.experience} yrs`}
                        </p>
                      </div>
                      <div className="flex items-center gap-0.5 shrink-0">
                        <Badge variant="outline" className={`text-small ${getScoreColor(job.matchScore)}`}>
                          {job.matchScore}%
                        </Badge>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-[14px] w-[14px]" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-small text-muted-foreground text-center pt-1 border-t border-border">
                This digest was generated based on your preferences.
              </p>
            </CardContent>
          </Card>

          <div className="flex gap-1.5">
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              <Clipboard className="h-[14px] w-[14px]" />
              Copy Digest to Clipboard
            </Button>
            <Button variant="outline" size="sm" onClick={createEmailDraft}>
              <Mail className="h-[14px] w-[14px]" />
              Create Email Draft
            </Button>
          </div>

          <p className="text-small text-muted-foreground/60 text-center">
            Demo Mode: Daily 9AM trigger simulated manually.
          </p>
        </div>
      )}

      {/* Recent Status Updates */}
      {recentUpdates.length > 0 && (
        <Card className="border mt-4">
          <CardContent className="p-3 flex flex-col gap-2">
            <div className="flex items-center gap-1 border-b border-border pb-1.5">
              <Activity className="h-[16px] w-[16px] text-muted-foreground" />
              <h2 className="text-title font-serif text-foreground">Recent Status Updates</h2>
            </div>
            <div className="flex flex-col gap-1">
              {recentUpdates.map((u, i) => (
                <div key={i} className="flex items-center justify-between gap-2 py-0.5 border-b border-border/30 last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-caption font-semibold text-foreground truncate">{u.title}</p>
                    <p className="text-small text-muted-foreground">{u.company}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Badge variant="outline" className={`text-small ${statusColor[u.status]}`}>
                      {u.status}
                    </Badge>
                    <span className="text-small text-muted-foreground">
                      {format(new Date(u.date), "MMM d")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
};

export default Digest;
