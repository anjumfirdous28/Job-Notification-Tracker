import PageShell from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const metrics = [
  { title: "Total Builds", value: "128", change: "+12 this week", status: "success" as const },
  { title: "Active Projects", value: "7", change: "2 in progress", status: "warning" as const },
  { title: "Success Rate", value: "94.2%", change: "+3.1% from last month", status: "success" as const },
];

const recentActivity = [
  { action: "Build completed", project: "Landing Page v2", time: "12 min ago", status: "Shipped" },
  { action: "Test passed", project: "Auth Module", time: "1 hr ago", status: "Shipped" },
  { action: "Build started", project: "Dashboard UI", time: "2 hrs ago", status: "In Progress" },
  { action: "Error reported", project: "Payment Flow", time: "5 hrs ago", status: "Not Started" },
  { action: "Deploy triggered", project: "API Gateway", time: "1 day ago", status: "Shipped" },
];

const statusBadgeClass: Record<string, string> = {
  "Shipped": "bg-success/15 text-success border-success/30",
  "In Progress": "bg-warning/15 text-warning border-warning/30",
  "Not Started": "bg-muted text-muted-foreground border-border",
};

const Dashboard = () => {
  return (
    <PageShell
      headline="Dashboard"
      subtext="Overview of your builds, activity, and project health."
      projectName="KodNest Premium"
      currentStep={2}
      totalSteps={5}
      status="In Progress"
    >
      <div className="flex flex-col gap-3">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {metrics.map((metric) => (
            <Card key={metric.title}>
              <CardHeader className="pb-1">
                <CardTitle className="text-caption font-sans font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-display font-serif text-foreground">{metric.value}</p>
                <p className={`text-small mt-1 ${metric.status === "success" ? "text-success" : "text-warning"}`}>
                  {metric.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-title">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              {recentActivity.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between py-2 ${
                    i !== recentActivity.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-body font-medium text-foreground">{item.action}</span>
                    <span className="text-caption text-muted-foreground">{item.project}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-small text-muted-foreground">{item.time}</span>
                    <Badge variant="outline" className={`text-small ${statusBadgeClass[item.status]}`}>
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card>
          <CardContent className="flex flex-col items-center text-center py-4">
            <h3 className="text-title font-serif text-foreground">Ready for your next build?</h3>
            <p className="text-body text-muted-foreground mt-1 mb-3">
              Start a new project or continue where you left off.
            </p>
            <div className="flex gap-2">
              <Button variant="default">Start New Build</Button>
              <Button variant="outline">View All Projects</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
};

export default Dashboard;
