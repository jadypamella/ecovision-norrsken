import { Link } from 'react-router-dom';
import { Clock, MapPin, Percent, ChevronRight } from 'lucide-react';
import { EventTypeBadge, SeverityBadge, getEventIcon } from '@/components/common/EventBadge';
import type { SafetyEvent } from '@/types';
import { cn } from '@/lib/utils';

interface EventCardProps {
  event: SafetyEvent;
  className?: string;
}

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const EventCard = ({ event, className }: EventCardProps) => {
  const Icon = getEventIcon(event.type);

  return (
    <Link 
      to={`/events/${event.id}`}
      className={cn(
        'eco-card-hover group block',
        className
      )}
    >
      {/* Colored top accent */}
      <div className={cn(
        'h-1 -mx-6 -mt-6 mb-4 rounded-t-xl',
        event.type === 'fire' && 'bg-fire',
        event.type === 'deforestation' && 'bg-deforestation',
        event.type === 'storm' && 'bg-storm',
        event.type === 'wildlife' && 'bg-wildlife',
      )} />
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center',
            event.type === 'fire' && 'bg-fire-bg',
            event.type === 'deforestation' && 'bg-deforestation-bg',
            event.type === 'storm' && 'bg-storm-bg',
            event.type === 'wildlife' && 'bg-wildlife-bg',
          )}>
            <Icon className={cn(
              'w-5 h-5',
              event.type === 'fire' && 'text-fire',
              event.type === 'deforestation' && 'text-deforestation',
              event.type === 'storm' && 'text-storm',
              event.type === 'wildlife' && 'text-wildlife',
            )} />
          </div>
          <EventTypeBadge type={event.type} />
        </div>
        <SeverityBadge severity={event.severity} />
      </div>
      
      {/* Content */}
      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {event.title}
      </h3>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
        {event.description}
      </p>
      
      {/* Meta */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {formatTimestamp(event.timestamp)}
        </span>
        {event.location && (
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {event.location}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Percent className="w-3.5 h-3.5" />
          {Math.round(event.confidence * 100)}% confidence
        </span>
      </div>
      
      {/* View action */}
      <div className="flex items-center gap-1 mt-4 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        View Details
        <ChevronRight className="w-4 h-4" />
      </div>
    </Link>
  );
};
