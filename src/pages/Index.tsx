import PageShell from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  return (
    <PageShell
      headline="Design System"
      subtext="KodNest Premium Build System — component and token reference."
      projectName="KodNest Premium"
      currentStep={1}
      totalSteps={5}
      status="In Progress"
    >
      <div className="flex flex-col gap-4">
        {/* Typography */}
        <Card>
          <CardHeader>
            <CardTitle className="text-title">Typography</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <h1>Display Heading</h1>
            <h2>Section Headline</h2>
            <h3>Subsection Title</h3>
            <h4>Card Title</h4>
            <p className="text-body text-foreground">
              Body text at 16px with 1.7 line-height. Clean, readable, and constrained to 720px max-width for optimal readability across all viewports.
            </p>
            <p className="text-caption text-muted-foreground">
              Caption text for secondary information and labels.
            </p>
          </CardContent>
        </Card>

        {/* Colors */}
        <Card>
          <CardHeader>
            <CardTitle className="text-title">Color Palette</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              <div className="flex flex-col items-center gap-1">
                <div className="w-5 h-5 rounded-md bg-background border border-border" />
                <span className="text-small text-muted-foreground">Background</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-5 h-5 rounded-md bg-foreground" />
                <span className="text-small text-muted-foreground">Foreground</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-5 h-5 rounded-md bg-primary" />
                <span className="text-small text-muted-foreground">Primary</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-5 h-5 rounded-md bg-success" />
                <span className="text-small text-muted-foreground">Success</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-5 h-5 rounded-md bg-warning" />
                <span className="text-small text-muted-foreground">Warning</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-5 h-5 rounded-md bg-muted" />
                <span className="text-small text-muted-foreground">Muted</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle className="text-title">Buttons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap items-center">
              <Button variant="default">Primary Action</Button>
              <Button variant="outline">Secondary</Button>
              <Button variant="secondary">Tertiary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="success">Success</Button>
              <Button variant="link">Link</Button>
              <Button variant="default" disabled>Disabled</Button>
            </div>
            <div className="flex gap-2 mt-2 flex-wrap items-center">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </CardContent>
        </Card>

        {/* Inputs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-title">Inputs</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 max-w-[360px]">
            <Input placeholder="Default input" />
            <Input placeholder="Disabled input" disabled />
          </CardContent>
        </Card>

        {/* Badges */}
        <Card>
          <CardHeader>
            <CardTitle className="text-title">Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-1 flex-wrap">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Empty State */}
        <Card>
          <CardHeader>
            <CardTitle className="text-title">Empty State</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-4">
            <p className="text-body-lg text-muted-foreground mb-2">
              No builds yet.
            </p>
            <p className="text-caption text-muted-foreground mb-3">
              Start your first build to see results here.
            </p>
            <Button variant="default">Start Building</Button>
          </CardContent>
        </Card>

        {/* Error State */}
        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle className="text-title">Error State</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-body text-foreground mb-1">
              The build could not be completed.
            </p>
            <p className="text-caption text-muted-foreground mb-2">
              This usually happens when the prompt is too vague. Try being more specific about the layout and components you need.
            </p>
            <Button variant="outline" size="sm">Retry Build</Button>
          </CardContent>
        </Card>

        {/* Spacing Reference */}
        <Card>
          <CardHeader>
            <CardTitle className="text-title">Spacing Scale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              {[
                { label: "8px (1)", width: "w-[8px]" },
                { label: "16px (2)", width: "w-[16px]" },
                { label: "24px (3)", width: "w-[24px]" },
                { label: "40px (4)", width: "w-[40px]" },
                { label: "64px (5)", width: "w-[64px]" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <div className={`${s.width} h-1 bg-primary rounded-sm`} />
                  <span className="text-small text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
};

export default Index;
