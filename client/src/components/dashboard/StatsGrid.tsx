import { TrendingUp, TrendingDown, Folder, Clock, CheckCircle, Wallet } from 'lucide-react';
import { dashboardStats } from '@/data/mockData';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  Folder,
  Clock,
  CheckCircle,
  Wallet,
};

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {dashboardStats.map((stat, index) => {
        const Icon = iconMap[stat.icon] || Folder;
        const isPositive = (stat.change ?? 0) > 0;
        
        return (
          <div
            key={stat.id}
            className="civic-stat-card animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                <p className="text-3xl font-bold mt-2 text-foreground">{stat.value}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
              </div>
            </div>
            
            {stat.change !== undefined && (
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <div
                  className={cn(
                    'flex items-center gap-1 text-sm font-medium',
                    isPositive ? 'text-civic-success' : 'text-destructive'
                  )}
                >
                  {isPositive ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{Math.abs(stat.change)}%</span>
                </div>
                <span className="text-sm text-muted-foreground">{stat.changeLabel}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
