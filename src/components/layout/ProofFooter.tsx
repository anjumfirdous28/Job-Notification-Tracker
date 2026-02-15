import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface ProofItem {
  id: string;
  label: string;
}

const defaultItems: ProofItem[] = [
  { id: "ui", label: "UI Built" },
  { id: "logic", label: "Logic Working" },
  { id: "test", label: "Test Passed" },
  { id: "deployed", label: "Deployed" },
];

const ProofFooter = ({ items = defaultItems }: { items?: ProofItem[] }) => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <footer className="border-t border-border bg-card px-3 py-2">
      <div className="flex items-center gap-4 flex-wrap">
        {items.map((item) => (
          <label
            key={item.id}
            className="flex items-center gap-1 cursor-pointer select-none"
          >
            <Checkbox
              checked={!!checked[item.id]}
              onCheckedChange={() => toggle(item.id)}
              className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <span
              className={`text-caption transition-all duration-[180ms] ease-in-out ${
                checked[item.id] ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </span>
          </label>
        ))}
      </div>
    </footer>
  );
};

export default ProofFooter;
