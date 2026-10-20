import { Clock } from 'lucide-react';
import { cn } from '../lib/utils';

interface ScheduleItem {
  time: string;
  subject: string;
  room: string;
  teacher: string;
  current?: boolean;
}

interface ScheduleCardProps {
  day: string;
  items: ScheduleItem[];
}

export function ScheduleCard({ day, items }: ScheduleCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-heading text-sm font-semibold text-foreground">{day}</h3>
      </div>
      <div className="space-y-1">
        {items.map((item, i) => (
          <div
            key={i}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
              item.current ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/50'
            )}
          >
            <span className="w-14 shrink-0 text-xs font-medium text-muted-foreground">{item.time}</span>
            <div className="flex-1 min-w-0">
              <p className={cn('text-sm font-medium', item.current ? 'text-primary' : 'text-foreground')}>{item.subject}</p>
              <p className="text-xs text-muted-foreground">{item.teacher} · {item.room}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
