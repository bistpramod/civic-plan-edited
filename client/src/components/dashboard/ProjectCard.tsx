import { MapPin, Calendar, ChevronRight } from 'lucide-react';
import { Project, formatCurrency, formatDate, getStatusColor, getProgressColor, categories } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Zap, Droplets, Route, Heart, GraduationCap } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Zap,
  Droplets,
  Route,
  Heart,
  GraduationCap,
};

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const category = categories.find((c) => c.id === project.category);
  const CategoryIcon = category ? iconMap[category.icon] : null;

  return (
    <div
      className="civic-card cursor-pointer group hover:border-primary/30 animate-slide-up"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          {CategoryIcon && (
            <div className={cn('w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0', category?.color)}>
              <CategoryIcon className="w-5 h-5" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {project.title}
            </h3>
            <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {project.location} • Ward {project.ward}
              </span>
            </div>
          </div>
        </div>

        <span className={cn('civic-badge capitalize shrink-0', getStatusColor(project.status))}>
          {project.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
        {project.description}
      </p>

      {/* Progress */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-semibold text-foreground">{project.progress}%</span>
        </div>
        <div className="progress-bar">
          <div
            className={cn('progress-fill', getProgressColor(project.status))}
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Budget: </span>
            <span className="font-medium text-foreground">{formatCurrency(project.budget)}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(project.endDate)}</span>
          </div>
        </div>

        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
}
