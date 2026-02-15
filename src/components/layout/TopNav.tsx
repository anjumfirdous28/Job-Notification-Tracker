import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Saved", to: "/saved" },
  { label: "Digest", to: "/digest" },
  { label: "Settings", to: "/settings" },
  { label: "Proof", to: "/proof" },
];

const TopNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClass =
    "text-caption font-sans font-medium text-muted-foreground py-1.5 border-b-2 border-transparent transition-calm hover:text-foreground";
  const activeClass = "!text-primary !border-primary";

  return (
    <header className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-3 h-[48px]">
        {/* Brand */}
        <NavLink to="/" className="text-caption font-semibold text-foreground tracking-tight font-sans">
          KodNest
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={linkClass}
              activeClassName={activeClass}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground p-1"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-[20px] w-[20px]" /> : <Menu className="h-[20px] w-[20px]" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <nav className="md:hidden flex flex-col border-t border-border bg-card px-3 pb-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className="text-caption font-sans font-medium text-muted-foreground py-1.5 transition-calm hover:text-foreground"
              activeClassName="!text-primary"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
};

export default TopNav;
