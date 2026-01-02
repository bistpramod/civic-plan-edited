import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "./NavLink";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderKanban,
  Bell,
  Inbox,
  Users,
  Settings,
  LogOut,
  Search,
  ChevronDown,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: FolderKanban, label: "Projects", path: "/admin/projects" },
  { icon: Users, label: "Users", path: "/admin/users" },
  { icon: Bell, label: "Notifications", path: "/admin/notifications" },
  { icon: Inbox, label: "Inbox", path: "/admin/inbox" },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  function switchToCitizen() {
    localStorage.setItem("role", "citizen");
    navigate("/");
  }

  function switchToAdmin() {
    localStorage.setItem("role", "admin");
    navigate("/admin");
  }

  function logout() {
    localStorage.removeItem("role");
    navigate("/");
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className={cn("fixed h-full flex flex-col bg-sidebar transition-all duration-300", collapsed ? "w-20" : "w-64")}>
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center shrink-0">
            <span className="text-xl font-bold text-accent-foreground">C</span>
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">Civic Plan</h1>
              <p className="text-xs text-sidebar-foreground/60">Admin Panel</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200',
                  active
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
              >
                <item.icon className={cn('w-5 h-5 shrink-0', active ? 'text-sidebar-accent-foreground' : 'text-sidebar-foreground/80')} />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-sidebar-border space-y-1">
          <NavLink
            to="/admin/settings"
            className={cn('flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200', 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground')}
            activeClassName={'bg-sidebar-accent text-sidebar-accent-foreground font-semibold'}
          >
            <Settings className={"w-5 h-5 shrink-0 text-sidebar-foreground/80"} />
            {!collapsed && <span>Settings</span>}
          </NavLink>
          <button
            onClick={() => {
              localStorage.removeItem("role");
              window.location.href = "/";
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full text-left"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center shadow-civic hover:shadow-civic-lg transition-shadow z-40"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </aside>

      {/* Main Content */}
      <div className={cn('flex-1 transition-all duration-300', collapsed ? 'ml-20' : 'ml-64')}>
        {/* Top Header */}
        <header className="h-16 bg-card border-b border-border sticky top-0 z-40 flex items-center justify-between px-6">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search projects, users..."
                className="w-full pl-10 pr-4 py-2 bg-secondary border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">Admin User</p>
                <p className="text-xs text-muted-foreground">Kathmandu</p>
              </div>

              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((s) => !s)}
                  className="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-muted"
                >
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-foreground">A</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-popover border border-border rounded-md shadow-md py-1 z-50">
                    <button
                      onClick={() => {
                        switchToCitizen();
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-muted"
                    >
                      Switch to Citizen
                    </button>
                    <div className="border-t border-border my-1" />
                    <button
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-muted"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
