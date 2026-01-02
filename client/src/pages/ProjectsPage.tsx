import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Helmet } from 'react-helmet-async';
import { useMemo, useState } from 'react';
import { projects, Project, categories } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');

  const locations = ['All Locations', ...Array.from(new Set(projects.map(p => p.location)) )];

  const visibleProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
      const matchesLocation = selectedLocation === 'All Locations' || p.location === selectedLocation;
      return matchesSearch && matchesLocation;
    });
  }, [search, selectedLocation]);

  return (
    <>
      <Helmet>
        <title>Projects & Progress - Civic Plan Nepal</title>
        <meta name="description" content="Browse all government infrastructure projects in Nepal. Filter by category, status, and track progress of electricity, water, roads, health, and education projects." />
      </Helmet>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="animate-fade-in">
            <h1 className="text-2xl font-bold text-foreground">
              Projects & Progress
            </h1>
            <p className="text-muted-foreground mt-1">
              Browse and track all infrastructure development projects
            </p>
          </div>



          {/* Search / location */}
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground">Showing {visibleProjects.length} projects</p>

          {/* Project list (new layout) */}
          <div className="bg-white rounded-lg p-6">
            <div className="space-y-6">
              {visibleProjects.length > 0 ? (
                visibleProjects.map((project, idx) => (
                  <div key={project.id}>
                    <div className="w-full rounded-md overflow-hidden">
                      {/* Category pill */}
                      {(() => {
                        const cat = categories.find((c) => c.id === project.category);
                        return (
                          <div className="w-full bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border text-sm rounded-md px-3 py-1 text-center mb-3">
                            {cat ? cat.label : project.category}
                          </div>
                        );
                      })()}

                      {/* Card */}
                      <div
                        onClick={() => navigate(`/projects/${project.id}`)}
                        className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-md"
                      >
                        <h3 className="text-center font-bold text-lg">{project.title}</h3>
                        <p className="text-center text-sm text-gray-500 mt-3 line-clamp-2">{project.description}</p>

                        <div className="flex items-center justify-between mt-4">
                          <div className="text-sm text-muted-foreground">
                            {project.location} · Ward {project.ward} · {project.progress}%
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); navigate(`/projects/${project.id}`); }}
                            className="text-sm text-primary hover:underline"
                          >
                            See more
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* divider */}
                    {idx !== visibleProjects.length - 1 && <hr className="my-6" />}
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No projects found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ProjectsPage;
