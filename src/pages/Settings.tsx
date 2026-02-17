import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePreferences, Preferences, defaultPreferences } from "@/hooks/use-preferences";
import { allLocations } from "@/data/jobs";
import { toast } from "@/hooks/use-toast";

const modes = ["Remote", "Hybrid", "Onsite"] as const;
const experienceLevels = ["Fresher", "0-1", "1-3", "3-5"] as const;

const Settings = () => {
  const { preferences, save } = usePreferences();
  const [form, setForm] = useState<Preferences>(preferences);

  const toggleMode = (mode: string) => {
    setForm((prev) => ({
      ...prev,
      preferredMode: prev.preferredMode.includes(mode)
        ? prev.preferredMode.filter((m) => m !== mode)
        : [...prev.preferredMode, mode],
    }));
  };

  const toggleLocation = (loc: string) => {
    setForm((prev) => ({
      ...prev,
      preferredLocations: prev.preferredLocations.includes(loc)
        ? prev.preferredLocations.filter((l) => l !== loc)
        : [...prev.preferredLocations, loc],
    }));
  };

  const handleSave = () => {
    save(form);
    toast({ title: "Preferences saved", description: "Your matching criteria have been updated." });
  };

  return (
    <main className="flex flex-col items-center px-3 py-4">
      <div className="w-full max-w-[560px] flex flex-col gap-3">
        <div>
          <h1 className="text-display font-serif text-foreground">Preferences</h1>
          <p className="text-body text-muted-foreground mt-0.5">
            Configure your job tracking criteria for intelligent matching.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-title font-serif">Tracking Criteria</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex flex-col gap-0.5">
              <Label htmlFor="keywords">Role Keywords</Label>
              <Input
                id="keywords"
                placeholder="e.g. Frontend, React, SDE Intern"
                value={form.roleKeywords}
                onChange={(e) => setForm({ ...form, roleKeywords: e.target.value })}
              />
              <span className="text-small text-muted-foreground">Comma-separated keywords to match against job titles.</span>
            </div>

            <div className="flex flex-col gap-0.5">
              <Label>Preferred Locations</Label>
              <div className="flex flex-wrap gap-1">
                {allLocations.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => toggleLocation(loc)}
                    className={`text-small px-1.5 py-0.5 rounded-md border transition-calm ${
                      form.preferredLocations.includes(loc)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-muted-foreground border-border hover:bg-muted"
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-0.5">
              <Label>Work Mode</Label>
              <div className="flex gap-2">
                {modes.map((mode) => (
                  <label key={mode} className="flex items-center gap-0.5 text-caption cursor-pointer">
                    <Checkbox
                      checked={form.preferredMode.includes(mode)}
                      onCheckedChange={() => toggleMode(mode)}
                    />
                    {mode}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-0.5">
              <Label htmlFor="experience">Experience Level</Label>
              <Select
                value={form.experienceLevel}
                onValueChange={(v) => setForm({ ...form, experienceLevel: v })}
              >
                <SelectTrigger id="experience">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  {experienceLevels.map((lvl) => (
                    <SelectItem key={lvl} value={lvl}>
                      {lvl === "Fresher" ? "Fresher" : `${lvl} yrs`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-0.5">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                placeholder="e.g. React, TypeScript, Node.js"
                value={form.skills}
                onChange={(e) => setForm({ ...form, skills: e.target.value })}
              />
              <span className="text-small text-muted-foreground">Comma-separated skills to match against job requirements.</span>
            </div>

            <div className="flex flex-col gap-0.5">
              <Label>Minimum Match Score: {form.minMatchScore}%</Label>
              <Slider
                value={[form.minMatchScore]}
                onValueChange={(v) => setForm({ ...form, minMatchScore: v[0] })}
                min={0}
                max={100}
                step={5}
              />
              <span className="text-small text-muted-foreground">
                Jobs scoring below this threshold can be hidden on the dashboard.
              </span>
            </div>

            <Button className="mt-1 self-start" onClick={handleSave}>
              Save Preferences
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Settings;
