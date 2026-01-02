import { Search, Bell, User, MapPin, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { locations } from '@/data/mockData';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AppHeaderProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function AppHeader({
  selectedLocation,
  onLocationChange,
  searchQuery,
  onSearchChange,
}: AppHeaderProps) {
  const navigate = useNavigate();
  const [role, setRole] = useState<'citizen' | 'admin'>(() => {
    return (localStorage.getItem('role') as 'citizen' | 'admin') ?? 'citizen';
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('role', role);
  }, [role]);

  useEffect(() => {
    // If role is admin and not currently on admin, optionally navigate
    // but we won't auto-redirect here to avoid surprise; switching triggers navigation explicitly.
  }, [role]);

  const switchToAdmin = () => {
    setRole('admin');
    setMenuOpen(false);
    navigate('/admin');
  };

  const switchToCitizen = () => {
    setRole('citizen');
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Search Section */}
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects, locations..."
              className="pl-10 bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* Location Filter */}
          <Select value={selectedLocation} onValueChange={onLocationChange}>
            <SelectTrigger className="w-40 bg-secondary border-0">
              <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((loc) => (
                <SelectItem key={loc.id} value={loc.id}>
                  {loc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 pl-3 border-l border-border relative">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">{role === 'admin' ? 'Admin User' : 'User'}</p>
              <p className="text-xs text-muted-foreground">{role === 'admin' ? 'Administrator' : 'Citizen'}</p>
            </div>

            <button
              onClick={() => setMenuOpen((s) => !s)}
              className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1"
              aria-label="User menu"
            >
              <User className="w-5 h-5" />
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-card rounded-md border border-border shadow-md z-50">
                <div className="p-2">
                  {role !== 'admin' ? (
                    <button
                      className="w-full text-left px-3 py-2 rounded hover:bg-muted"
                      onClick={switchToAdmin}
                    >
                      Switch to Admin
                    </button>
                  ) : (
                    <button
                      className="w-full text-left px-3 py-2 rounded hover:bg-muted"
                      onClick={switchToCitizen}
                    >
                      Switch to Citizen
                    </button>
                  )}
                  <div className="h-px bg-border my-2" />
                  <button
                    className="w-full text-left px-3 py-2 rounded hover:bg-muted"
                    onClick={() => {
                      // simple logout - clear role and navigate to login
                      localStorage.removeItem('role');
                      setRole('citizen');
                      setMenuOpen(false);
                      navigate('/login');
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
