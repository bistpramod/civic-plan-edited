import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Helmet } from 'react-helmet-async';
import { localBodies, formatCurrency } from '@/data/mockData';
import { Building2, MapPin, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useNavigate, useSearchParams } from 'react-router-dom';

const LocalBodiesPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const searchQuery = searchParams.get('search') || '';
  const locationFilter = searchParams.get('location') || 'all';

  // Filter local bodies based on search and location
  const filteredBodies = localBodies.filter((body) => {
    const matchesSearch = searchQuery === '' || 
      body.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      body.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      body.province.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = locationFilter === 'all' || 
      body.district.toLowerCase().includes(locationFilter.toLowerCase()) ||
      body.name.toLowerCase().includes(locationFilter.toLowerCase());
    
    return matchesSearch && matchesLocation;
  });

  return (
    <>
      <Helmet>
        <title>Local Body Info - Civic Plan Nepal</title>
        <meta name="description" content="View information about local government bodies in Nepal including municipalities, metropolitan cities, and their infrastructure development progress." />
      </Helmet>
      <DashboardLayout hideHeader>
        <div className="space-y-6">
          {/* Header */}
          <div className="animate-fade-in">
            <h1 className="text-2xl font-bold text-foreground">
              Local Body Information
            </h1>
            <p className="text-muted-foreground mt-1">
              Overview of local government units and their development progress
              </p>
          </div>

          {/* Local Bodies Grid */}
          {filteredBodies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredBodies.map((body, index) => {
                const completionRate = Math.round((body.completedProjects / body.totalProjects) * 100);
                
                return (
                  <div
                    key={body.id}
                    className="civic-card animate-slide-up cursor-pointer group hover:border-primary/30"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => navigate(`/local-bodies/${body.id}`)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl gradient-civic flex items-center justify-center shrink-0">
                        <Building2 className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">{body.name}</h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{body.district}, {body.province}</span>
                        </div>
                        <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground capitalize">
                          {body.type.replace('-', ' ')}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-foreground">{body.totalProjects}</p>
                        <p className="text-xs text-muted-foreground">Total Projects</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-civic-success">{body.completedProjects}</p>
                        <p className="text-xs text-muted-foreground">Completed</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-primary">{formatCurrency(body.totalBudget)}</p>
                        <p className="text-xs text-muted-foreground">Total Budget</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          Completion Rate
                        </span>
                        <span className="font-semibold text-foreground">{completionRate}%</span>
                      </div>
                      <Progress value={completionRate} className="h-2" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="civic-card text-center py-12">
              <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No local bodies found matching your criteria.</p>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or location filter.</p>
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default LocalBodiesPage;