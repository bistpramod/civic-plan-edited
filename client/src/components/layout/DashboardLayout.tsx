import { ReactNode, useState, createContext, useContext } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";

// Create context for filters
interface FilterContextType {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Hook to use filters in any component
export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within DashboardLayout");
  }
  return context;
}
// In DashboardLayout.tsx
interface DashboardLayoutProps {
  children: ReactNode;
  hideHeader?: boolean;
}

export function DashboardLayout({
  children,
  hideHeader = false,
}: DashboardLayoutProps) {
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const resetFilters = () => {
    setSelectedLocation("all");
    setSearchQuery("");
  };

  return (
    <FilterContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation,
        searchQuery,
        setSearchQuery,
        resetFilters,
      }}
    >
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          {!hideHeader && (
            <AppHeader
              selectedLocation={selectedLocation}
              onLocationChange={setSelectedLocation}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          )}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </FilterContext.Provider>
  );
}
