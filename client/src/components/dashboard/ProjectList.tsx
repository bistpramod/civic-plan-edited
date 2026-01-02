import { useState, useMemo } from 'react';
import { projects } from '@/data/mockData';
import { ProjectCard } from './ProjectCard';
import { Project } from '@/data/mockData';
import { useFilters } from '@/components/layout/DashboardLayout';
import { useNavigate } from 'react-router-dom';

export function ProjectList() {
  const { selectedLocation, searchQuery } = useFilters();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all');
  const navigate = useNavigate();
  
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by location
    if (selectedLocation !== 'all') {
      filtered = filtered.filter((p) => {
        // Match location by ID from mockData
        const locationMap: Record<string, string> = {
          'ktm': 'Kathmandu',
          'ptn': 'Patan',
          'bkt': 'Bhaktapur',
          'pkr': 'Pokhara',
          'brt': 'Biratnagar'
        };
        return p.location === locationMap[selectedLocation];
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((p) => 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.contractor.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [selectedCategory, selectedLocation, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header with filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Infrastructure Projects</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ProjectCard
                project={project}
                onClick={() => navigate(`/projects/${project.id}`)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No projects found matching your filters</p>
          <p className="text-muted-foreground text-sm mt-2">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}