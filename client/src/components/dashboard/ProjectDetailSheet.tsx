import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, User, Wallet, CheckCircle, Circle, AlertTriangle, TrendingUp, X } from 'lucide-react';
import { Zap, Droplets, Route, Heart, GraduationCap } from 'lucide-react';
import { Project, formatCurrency, formatDate, getStatusColor, getProgressColor, categories } from '@/data/mockData';

const iconMap: Record<string, React.ElementType> = {
  Zap,
  Droplets,
  Route,
  Heart,
  GraduationCap,
};

interface ProjectDetailSheetProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}

export function ProjectDetailSheet({ project, open, onClose }: ProjectDetailSheetProps) {
  const [milestones, setMilestones] = useState<Project['milestones']>([]);

  useEffect(() => {
    if (project) setMilestones(project.milestones ?? []);
  }, [project]);

  if (!project || !open) return null;

  const category = categories.find((c) => c.id === project.category);
  const CategoryIcon = category ? iconMap[category.icon] : null;

  const toggleMilestone = (id: string) => {
    setMilestones((prev) => prev.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m)));
  };

  const sortedMilestones = [...milestones].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const completedMilestones = milestones.filter((m) => m.completed).length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden my-4">
        <div className="p-8 overflow-y-auto max-h-[95vh]">
          {/* Header */}
          <div className="flex justify-between items-start mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-start gap-6 flex-1">
              {CategoryIcon && (
                <div className={`w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center shrink-0 ${category?.color}`}>
                  <CategoryIcon className="w-10 h-10" />
                </div>
              )}
              <div className="flex-1">
                <span className={`px-3 py-1 rounded-full text-sm capitalize inline-block mb-3 border ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
                <h2 className="text-4xl font-bold leading-tight text-gray-900">{project.title}</h2>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-12 pb-8">
            {/* Description */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <p className="text-gray-600 text-lg leading-relaxed">{project.description}</p>
            </div>

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
                <span className="text-5xl font-bold text-blue-600">{project.progress}%</span>
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
                Milestones ({completedMilestones}/{milestones.length})
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {sortedMilestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    onClick={() => toggleMilestone(milestone.id)}
                    className={`flex items-start gap-4 p-6 rounded-xl border-2 cursor-pointer transition-all hover:scale-[1.02] ${
                      milestone.completed
                        ? 'bg-green-50 border-green-300 shadow-sm'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
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
                  {project.updates.map((update) => (
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
      </div>
    </div>
  );
}

export default ProjectDetailSheet;
