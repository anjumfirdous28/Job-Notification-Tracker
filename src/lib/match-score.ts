import { Job } from "@/data/jobs";
import { Preferences } from "@/hooks/use-preferences";

export const computeMatchScore = (job: Job, prefs: Preferences): number => {
  let score = 0;

  const keywords = prefs.roleKeywords
    .split(",")
    .map((k) => k.trim().toLowerCase())
    .filter(Boolean);

  const userSkills = prefs.skills
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  // +25 if any roleKeyword appears in job.title
  if (keywords.some((kw) => job.title.toLowerCase().includes(kw))) {
    score += 25;
  }

  // +15 if any roleKeyword appears in job.description
  if (keywords.some((kw) => job.description.toLowerCase().includes(kw))) {
    score += 15;
  }

  // +15 if job.location matches preferredLocations
  if (prefs.preferredLocations.some((loc) => loc === job.location)) {
    score += 15;
  }

  // +10 if job.mode matches preferredMode
  if (prefs.preferredMode.some((m) => m === job.mode)) {
    score += 10;
  }

  // +10 if job.experience matches experienceLevel
  if (prefs.experienceLevel && prefs.experienceLevel === job.experience) {
    score += 10;
  }

  // +15 if overlap between job.skills and user.skills
  if (
    userSkills.length > 0 &&
    job.skills.some((s) => userSkills.includes(s.toLowerCase()))
  ) {
    score += 15;
  }

  // +5 if postedDaysAgo <= 2
  if (job.postedDaysAgo <= 2) {
    score += 5;
  }

  // +5 if source is LinkedIn
  if (job.source === "LinkedIn") {
    score += 5;
  }

  return Math.min(score, 100);
};

export const getScoreColor = (score: number): string => {
  if (score >= 80) return "bg-success/15 text-success border-success/30";
  if (score >= 60) return "bg-warning/15 text-warning border-warning/30";
  if (score >= 40) return "border-border text-muted-foreground";
  return "border-border/50 text-muted-foreground/60";
};
