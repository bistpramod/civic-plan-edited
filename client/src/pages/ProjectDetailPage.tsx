import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Helmet } from 'react-helmet-async';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects, Project, formatCurrency, formatDate, getStatusColor, getProgressColor, categories } from '@/data/mockData';
import { MapPin, Calendar, User, Wallet, CheckCircle, Circle, AlertTriangle, TrendingUp, X, ArrowLeft } from 'lucide-react';
import { Zap, Droplets, Route, Heart, GraduationCap } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Zap,
  Droplets,
  Route,
  Heart,
  GraduationCap,
};

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id) ?? null;

  if (!project) {
    return (
      <DashboardLayout>
        <div className="py-20 text-center">
          <h1 className="text-2xl font-bold">Project not found</h1>
          <p className="text-muted-foreground mt-2">The requested project could not be found.</p>
          <div className="mt-6">
            <Link to="/projects" className="btn">
              Back to projects
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const category = categories.find((c) => c.id === project.category);
  const CategoryIcon = category ? iconMap[category.icon] : null;

  // sort milestones and updates newest-first (latest date on top)
  const sortedMilestones = [...project.milestones].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const sortedUpdates = [...(project.updates ?? [])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <Helmet>
        <title>{project.title} - Civic Plan Nepal</title>
      </Helmet>
      <DashboardLayout>
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-gray-100">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-bold">{project.title}</h1>
          </div>

          {/* Header */}
          <div className="flex items-start gap-6 mb-8">
            {CategoryIcon && (
              <div className={`w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center ${category?.color}`}>
                <CategoryIcon className="w-10 h-10" />
              </div>
            )}
            <div className="flex-1">
              <span className={`px-3 py-1 rounded-full text-sm capitalize inline-block mb-3 border ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
              <h2 className="text-3xl font-bold leading-tight text-gray-900">{project.title}</h2>
              <p className="text-gray-600 mt-3">{project.description}</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Key Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 text-gray-500 text-sm mb-3">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">Location</span>
                </div>
                <p className="font-semibold text-lg text-gray-900">{project.location}</p>
                <p className="text-sm text-gray-500 mt-1">Ward {project.ward}</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 text-gray-500 text-sm mb-3">
                  <User className="w-5 h-5" />
                  <span className="font-medium">Contractor</span>
                </div>
                <p className="font-semibold text-lg text-gray-900 line-clamp-2">{project.contractor}</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 text-gray-500 text-sm mb-3">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">Timeline</span>
                </div>
                <p className="font-semibold text-lg text-gray-900">{formatDate(project.startDate)}</p>
                <p className="text-sm text-gray-500 mt-1">to {formatDate(project.endDate)}</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 text-gray-500 text-sm mb-3">
                  <Wallet className="w-5 h-5" />
                  <span className="font-medium">Budget</span>
                </div>
                <p className="font-semibold text-lg text-gray-900">{formatCurrency(project.budget)}</p>
                <p className="text-sm text-gray-500 mt-1">Spent: {formatCurrency(project.spent)}</p>
              </div>
            </div>

            {/* Progress */}
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-gray-500" />
                  <span className="font-semibold text-xl text-gray-900">Overall Progress</span>
                </div>
                <span className="text-4xl font-bold text-blue-600">{project.progress}%</span>
              </div>
              <div className="bg-gray-200 h-4 rounded-full overflow-hidden">
                <div
                  className={`h-4 rounded-full transition-all duration-500 ${getProgressColor(project.status)}`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Milestones */}
            <div>
              <h3 className="font-bold mb-6 flex items-center gap-3 text-2xl text-gray-900">
                <CheckCircle className="w-7 h-7 text-gray-500" />
                Milestones ({project.milestones.filter(m => m.completed).length}/{project.milestones.length})
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {sortedMilestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className={`flex items-start gap-4 p-6 rounded-xl border-2 ${
                      milestone.completed
                        ? 'bg-green-50 border-green-300 shadow-sm'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    {milestone.completed ? (
                      <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400 shrink-0 mt-1" />
                    )}
                    <div className="flex-1">
                      <p className={`font-semibold text-base leading-tight ${milestone.completed ? 'text-green-700' : 'text-gray-900'}`}>
                        {milestone.title}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">{formatDate(milestone.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Updates */}
            {project.updates?.length > 0 && (
              <div>
                <h3 className="font-bold mb-6 flex items-center gap-3 text-2xl text-gray-900">
                  <AlertTriangle className="w-7 h-7 text-gray-500" />
                  Recent Updates
                </h3>

                <div className="space-y-5">
                  {sortedUpdates.map((update) => (
                    <div
                      key={update.id}
                      className={`p-6 rounded-xl border-l-4 ${
                        update.type === 'issue'
                          ? 'bg-red-50 border-l-red-500'
                          : update.type === 'milestone'
                          ? 'bg-green-50 border-l-green-500'
                          : 'bg-blue-50 border-l-blue-500'
                      }`}
                    >
                      <p className="text-sm text-gray-600 font-medium">{formatDate(update.date)}</p>
                      <p className="mt-2 text-base leading-relaxed text-gray-800">{update.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ProjectDetailPage;
