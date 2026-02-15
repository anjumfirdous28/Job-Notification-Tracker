import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, ExternalLink, AlertCircle, Camera } from "lucide-react";

interface SecondaryPanelProps {
  stepTitle?: string;
  stepDescription?: string;
  prompt?: string;
}

const SecondaryPanel = ({
  stepTitle = "Step Guidance",
  stepDescription = "Follow the instructions on the left. Use the prompt below to generate the required output.",
  prompt = "Create a responsive dashboard layout with a sidebar navigation and a main content area.",
}: SecondaryPanelProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside className="border-l border-border bg-card p-3 flex flex-col gap-3">
      <div>
        <h3 className="text-title font-serif text-foreground">{stepTitle}</h3>
        <p className="mt-1 text-caption text-muted-foreground">{stepDescription}</p>
      </div>

      {/* Prompt Box */}
      <div className="rounded-md border border-border bg-background p-2">
        <p className="text-caption text-foreground font-mono leading-relaxed">{prompt}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-1">
        <Button variant="outline" size="sm" onClick={handleCopy} className="justify-start gap-1">
          {copied ? <Check className="h-[14px] w-[14px]" /> : <Copy className="h-[14px] w-[14px]" />}
          {copied ? "Copied" : "Copy Prompt"}
        </Button>

        <Button variant="default" size="sm" className="justify-start gap-1">
          <ExternalLink className="h-[14px] w-[14px]" />
          Build in Lovable
        </Button>

        <Button variant="success" size="sm" className="justify-start gap-1">
          <Check className="h-[14px] w-[14px]" />
          It Worked
        </Button>

        <Button variant="outline" size="sm" className="justify-start gap-1 text-destructive border-destructive/30 hover:bg-destructive/10">
          <AlertCircle className="h-[14px] w-[14px]" />
          Error
        </Button>

        <Button variant="ghost" size="sm" className="justify-start gap-1">
          <Camera className="h-[14px] w-[14px]" />
          Add Screenshot
        </Button>
      </div>
    </aside>
  );
};

export default SecondaryPanel;
