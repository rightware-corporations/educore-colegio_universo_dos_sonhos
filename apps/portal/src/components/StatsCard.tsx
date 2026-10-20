import { type LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { ArrowUpRight } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  variant?: 'default' | 'primary' | 'accent';
  className?: string;
}

const variantStyles = {
  default: 'bg-card border border-border',
  primary: 'bg-accent border border-accent',
  accent: 'bg-secondary border border-secondary',
};

export function StatsCard({
  label,
  value,
  icon: Icon,
  trend,
  trendUp,
  variant = 'default',
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-5 transition-all hover:shadow-md active:scale-[0.98]',
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {Icon && (
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-3.5 w-3.5 text-primary" />
              </div>
            )}
            <span className="text-xs font-medium text-muted-foreground">{label}</span>
          </div>
          <p className="font-heading text-2xl font-bold text-foreground">{value}</p>
        </div>
        <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-xl bg-muted/50 text-muted-foreground">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      {trend && (
        <p className={cn('mt-2 text-xs font-medium', trendUp ? 'text-success' : 'text-destructive')}>
          {trend}
        </p>
      )}
    </div>
  );
}
