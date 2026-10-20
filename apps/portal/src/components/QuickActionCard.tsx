import { type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

interface QuickActionCardProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  to?: string;
  disabled?: boolean;
  description?: string;
  className?: string;
}

export function QuickActionCard({ icon: Icon, label, onClick, to, disabled, description, className }: QuickActionCardProps) {
  const baseClass = cn(
    'flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center transition-all',
    !disabled && 'hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5 active:scale-[0.98]',
    disabled && 'opacity-60 cursor-not-allowed',
    className
  );

  const inner = (
    <>
      <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', disabled ? 'bg-muted' : 'bg-primary/10')}>
        <Icon className={cn('h-5 w-5', disabled ? 'text-muted-foreground' : 'text-primary')} />
      </div>
      <span className="text-xs font-medium text-foreground">{label}</span>
      {description && <span className="text-[10px] text-muted-foreground">{description}</span>}
    </>
  );

  if (to && !disabled) {
    return <Link to={to} className={baseClass}>{inner}</Link>;
  }

  return (
    <button type="button" onClick={onClick} disabled={disabled} className={baseClass} title={disabled ? 'Em breve' : undefined}>
      {inner}
    </button>
  );
}
