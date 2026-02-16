import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Settings = () => {
  return (
    <main className="flex flex-col items-center px-3 py-10">
      <div className="w-full max-w-[560px] flex flex-col gap-6">
        <div>
          <h1 className="text-display font-serif text-foreground">Preferences</h1>
          <p className="text-body text-muted-foreground mt-1">
            Configure your job tracking criteria.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-title font-serif">Tracking Criteria</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="keywords">Role Keywords</Label>
              <Input id="keywords" placeholder="e.g. Frontend Engineer, React Developer" />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="locations">Preferred Locations</Label>
              <Input id="locations" placeholder="e.g. Bangalore, Mumbai, Remote" />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="mode">Work Mode</Label>
              <Select>
                <SelectTrigger id="mode">
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="onsite">Onsite</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="experience">Experience Level</Label>
              <Select>
                <SelectTrigger id="experience">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fresher">Fresher</SelectItem>
                  <SelectItem value="junior">Junior (1-3 yrs)</SelectItem>
                  <SelectItem value="mid">Mid (3-5 yrs)</SelectItem>
                  <SelectItem value="senior">Senior (5+ yrs)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="mt-2 self-start">Save Preferences</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Settings;
