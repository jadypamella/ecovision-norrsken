import { Link } from 'react-router-dom';
import { Clock, MapPin, ChevronRight } from 'lucide-react';
import { EventTypeBadge, SeverityBadge } from '@/components/common/EventBadge';
import type { SafetyEvent } from '@/types';

interface RecentEventsProps {
  events: SafetyEvent[];
}

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const RecentEvents = ({ events }: RecentEventsProps) => {
  return (
    <div className="eco-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg text-foreground">Recent Safety Events</h3>
        <Link 
          to="/timeline" 
          className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
        >
          View All
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="grid sm:grid-cols-2 gap-4">
        {events.map((event) => (
          <Link 
            key={event.id} 
            to={`/events/${event.id}`}
            className="group p-4 rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <EventTypeBadge type={event.type} />
              <SeverityBadge severity={event.severity} />
            </div>
            
            <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
              {event.title}
            </h4>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {event.description}
            </p>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatTimestamp(event.timestamp)}
              </span>
              {event.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {event.location}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
