import { LayoutDashboard, Palette, Settings, FolderOpen, BarChart3 } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const mainNav = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Design System", url: "/", icon: Palette },
  { title: "Projects", url: "/projects", icon: FolderOpen },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
];

const secondaryNav = [
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Brand */}
        <div className="px-3 py-3 border-b border-sidebar-border">
          <span className="text-caption font-semibold text-sidebar-foreground tracking-tight font-sans group-data-[collapsible=icon]:hidden">
            KodNest
          </span>
          <span className="text-caption font-semibold text-sidebar-foreground tracking-tight font-sans hidden group-data-[collapsible=icon]:block">
            K
          </span>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-small text-muted-foreground font-sans">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-2 px-2 py-1.5 rounded-md text-caption font-sans text-sidebar-foreground transition-calm"
                      activeClassName="bg-sidebar-accent text-primary font-medium"
                    >
                      <item.icon className="h-[16px] w-[16px] shrink-0" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Secondary */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-2 px-2 py-1.5 rounded-md text-caption font-sans text-sidebar-foreground transition-calm"
                      activeClassName="bg-sidebar-accent text-primary font-medium"
                    >
                      <item.icon className="h-[16px] w-[16px] shrink-0" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
