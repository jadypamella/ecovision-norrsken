import { Flame, Trees, CloudRain, Rabbit } from 'lucide-react';
import type { EventType, Severity } from '@/types';
import { cn } from '@/lib/utils';

interface EventTypeBadgeProps {
  type: EventType;
  showLabel?: boolean;
  className?: string;
}

const eventConfig: Record<EventType, { icon: typeof Flame; label: string; className: string }> = {
  fire: { icon: Flame, label: 'Fire', className: 'eco-badge-fire' },
  deforestation: { icon: Trees, label: 'Deforestation', className: 'eco-badge-deforestation' },
  storm: { icon: CloudRain, label: 'Storm', className: 'eco-badge-storm' },
  wildlife: { icon: Rabbit, label: 'Wildlife', className: 'eco-badge-wildlife' },
};

export const EventTypeBadge = ({ type, showLabel = true, className }: EventTypeBadgeProps) => {
  const config = eventConfig[type];
  const Icon = config.icon;

  return (
    <span className={cn(config.className, className)}>
      <Icon className="w-3.5 h-3.5" />
      {showLabel && config.label}
    </span>
  );
};

interface SeverityBadgeProps {
  severity: Severity;
  className?: string;
}

const severityConfig: Record<Severity, { label: string; className: string }> = {
  high: { label: 'High', className: 'eco-badge-severity-high' },
  medium: { label: 'Medium', className: 'eco-badge-severity-medium' },
  low: { label: 'Low', className: 'eco-badge-severity-low' },
};

export const SeverityBadge = ({ severity, className }: SeverityBadgeProps) => {
  const config = severityConfig[severity];

  return (
    <span className={cn(config.className, className)}>
      {config.label}
    </span>
  );
};

export const getEventIcon = (type: EventType) => eventConfig[type].icon;
export const getEventLabel = (type: EventType) => eventConfig[type].label;
