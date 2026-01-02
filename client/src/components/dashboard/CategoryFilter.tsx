import { cn } from '@/lib/utils';
import { categories, ProjectCategory } from '@/data/mockData';
import { Zap, Droplets, Route, Heart, GraduationCap } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Zap,
  Droplets,
  Route,
  Heart,
  GraduationCap,
};

interface CategoryFilterProps {
  selectedCategory: ProjectCategory | 'all';
  onCategoryChange: (category: ProjectCategory | 'all') => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onCategoryChange('all')}
        className={cn(
          'category-pill flex items-center gap-2',
          selectedCategory === 'all' ? 'category-pill-active' : 'category-pill-inactive'
        )}
      >
        All Categories
      </button>
      
      {categories.map((cat) => {
        const Icon = iconMap[cat.icon];
        const isActive = selectedCategory === cat.id;
        
        return (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={cn(
              'category-pill flex items-center gap-2',
              isActive ? 'category-pill-active' : 'category-pill-inactive'
            )}
          >
            {Icon && <Icon className="w-4 h-4" />}
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
