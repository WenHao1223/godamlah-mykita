import { NavLink } from "@/components/NavLink";
import { Users, MapPin, UserCircle, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mode, setMode] = useState<'admin' | 'victim'>(() => {
    if (typeof window === "undefined") return "admin";
    return (localStorage.getItem("mykita.mode") as 'admin' | 'victim') ?? 'admin';
  });

  useEffect(() => {
    try {
      localStorage.setItem("mykita.mode", mode);
    } catch (e) {
      // ignore storage errors
    }
  }, [mode]);

  const navItems = mode === 'admin'
    ? [
        { to: "/", label: "Victim Registration", icon: Users },
        { to: "/pps-tracking", label: "PPS Tracking", icon: MapPin },
      ]
    : [
        { to: "/victim-portal", label: "Victim Portal", icon: UserCircle },
      ];

  return (
    <nav
      className={`sticky top-0 z-50 shadow-lg ${
        mode === 'admin'
          ? 'bg-black' // admin mode: black background
          : 'header-gradient' // victim mode: original gradient
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg} backdrop-blur-sm`}>
              <img src="/logo.png" alt="MyKITA Logo" className="h-10 w-10" />
            </div>
            <div className="hidden sm:block">
              <h1 className={`text-lg font-bold ${mode === 'admin' ? 'text-white' : 'text-primary-foreground'}`}>MyKITA</h1>
              <p className={`text-xs ${mode === 'admin' ? 'text-white/80' : 'text-primary-foreground/80'}`}>Sistem Kad Identiti Tindakan Awal</p>
            </div>
          </div>

          {/* Desktop Navigation + Toggle Switch */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-end">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  mode === 'admin'
                    ? 'text-white/80 hover:bg-white/10'
                    : 'text-primary-foreground/80 hover:bg-primary-foreground/10'
                }`}
                activeClassName={mode === 'admin' ? 'bg-white/20 text-white' : 'bg-primary-foreground/20 text-primary-foreground'}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
            {/* Toggle Switch */}
            <div className="flex items-center gap-2 ml-4">
              <Switch
                id="mode-toggle"
                checked={mode === 'admin'}
                onCheckedChange={(checked) => setMode(checked ? 'admin' : 'victim')}
                className={mode === 'admin' ? 'data-[state=checked]:bg-white/80' : ''}
              />
              <Label htmlFor="mode-toggle" className={`text-xs ${mode === 'admin' ? 'text-white/60' : 'text-primary-foreground font-semibold'}`}>{mode === 'admin' ? 'Admin' : 'Victim'}</Label>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${mode === 'admin' ? 'text-white hover:bg-white/10' : 'text-primary-foreground hover:bg-primary-foreground/10'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    mode === 'admin'
                      ? 'text-white/80 hover:bg-white/10'
                      : 'text-primary-foreground/80 hover:bg-primary-foreground/10'
                  }`}
                  activeClassName={mode === 'admin' ? 'bg-white/20 text-white' : 'bg-primary-foreground/20 text-primary-foreground'}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              ))}
              {/* Toggle Switch for mobile */}
              <div className="flex items-center gap-2 mt-4 px-4">
                <Label htmlFor="mode-toggle-mobile" className={`text-xs ${mode === 'admin' ? 'text-white font-semibold' : 'text-primary-foreground/60'}`}>Admin</Label>
                <Switch
                  id="mode-toggle-mobile"
                  checked={mode === 'admin'}
                  onCheckedChange={(checked) => setMode(checked ? 'admin' : 'victim')}
                  className={mode === 'admin' ? 'data-[state=checked]:bg-white/80' : ''}
                />
                <Label htmlFor="mode-toggle-mobile" className={`text-xs ${mode === 'admin' ? 'text-white/60' : 'text-primary-foreground font-semibold'}`}>Victim</Label>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
