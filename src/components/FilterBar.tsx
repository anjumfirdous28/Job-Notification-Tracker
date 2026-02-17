import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { allLocations, allModes, allExperience, allSources } from "@/data/jobs";
import { allStatuses } from "@/hooks/use-job-status";
import { Search } from "lucide-react";

export interface Filters {
  keyword: string;
  location: string;
  mode: string;
  experience: string;
  source: string;
  sort: string;
  status: string;
}

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  showScoreSort?: boolean;
}

const FilterBar = ({ filters, onChange, showScoreSort }: FilterBarProps) => {
  const update = (key: keyof Filters, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-1 top-1/2 -translate-y-1/2 h-[16px] w-[16px] text-muted-foreground" />
        <Input
          placeholder="Search title or company…"
          value={filters.keyword}
          onChange={(e) => update("keyword", e.target.value)}
          className="pl-4"
        />
      </div>

      <Select value={filters.location} onValueChange={(v) => update("location", v)}>
        <SelectTrigger className="w-full sm:w-[150px]">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent className="bg-popover z-50">
          <SelectItem value="all">All Locations</SelectItem>
          {allLocations.map((loc) => (
            <SelectItem key={loc} value={loc}>{loc}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.mode} onValueChange={(v) => update("mode", v)}>
        <SelectTrigger className="w-full sm:w-[130px]">
          <SelectValue placeholder="Mode" />
        </SelectTrigger>
        <SelectContent className="bg-popover z-50">
          <SelectItem value="all">All Modes</SelectItem>
          {allModes.map((m) => (
            <SelectItem key={m} value={m}>{m}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.experience} onValueChange={(v) => update("experience", v)}>
        <SelectTrigger className="w-full sm:w-[140px]">
          <SelectValue placeholder="Experience" />
        </SelectTrigger>
        <SelectContent className="bg-popover z-50">
          <SelectItem value="all">All Levels</SelectItem>
          {allExperience.map((e) => (
            <SelectItem key={e} value={e}>{e === "Fresher" ? "Fresher" : `${e} yrs`}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.source} onValueChange={(v) => update("source", v)}>
        <SelectTrigger className="w-full sm:w-[130px]">
          <SelectValue placeholder="Source" />
        </SelectTrigger>
        <SelectContent className="bg-popover z-50">
          <SelectItem value="all">All Sources</SelectItem>
          {allSources.map((s) => (
            <SelectItem key={s} value={s}>{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.status} onValueChange={(v) => update("status", v)}>
        <SelectTrigger className="w-full sm:w-[140px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="bg-popover z-50">
          <SelectItem value="all">All Statuses</SelectItem>
          {allStatuses.map((s) => (
            <SelectItem key={s} value={s}>{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.sort} onValueChange={(v) => update("sort", v)}>
        <SelectTrigger className="w-full sm:w-[150px]">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent className="bg-popover z-50">
          <SelectItem value="latest">Latest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
          <SelectItem value="company">Company A-Z</SelectItem>
          {showScoreSort && <SelectItem value="matchScore">Match Score</SelectItem>}
          <SelectItem value="salary">Salary (High)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterBar;
