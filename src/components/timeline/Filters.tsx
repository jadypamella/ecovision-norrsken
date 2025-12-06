import { Flame, Trees, CloudRain, Rabbit, Filter } from 'lucide-react';
import type { EventType, Severity } from '@/types';
import { cn } from '@/lib/utils';

interface FiltersProps {
  selectedType: EventType | '';
  selectedSeverity: Severity | '';
  onTypeChange: (type: EventType | '') => void;
  onSeverityChange: (severity: Severity | '') => void;
}

const eventTypes: { value: EventType | ''; label: string; icon?: typeof Flame }[] = [
  { value: '', label: 'All Types' },
  { value: 'fire', label: 'Fire', icon: Flame },
  { value: 'deforestation', label: 'Deforestation', icon: Trees },
  { value: 'storm', label: 'Storm', icon: CloudRain },
  { value: 'wildlife', label: 'Wildlife', icon: Rabbit },
];

const severities: { value: Severity | ''; label: string }[] = [
  { value: '', label: 'All Severities' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

export const Filters = ({ 
  selectedType, 
  selectedSeverity, 
  onTypeChange, 
  onSeverityChange 
}: FiltersProps) => {
  return (
    <div className="eco-card mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Filter Events</h3>
      </div>
      
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Event Type Filter */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Event Type
          </label>
          <div className="flex flex-wrap gap-2">
            {eventTypes.map(({ value, label, icon: Icon }) => (
              <button
                key={value || 'all'}
                onClick={() => onTypeChange(value)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all',
                  selectedType === value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Severity Filter */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Severity
          </label>
          <div className="flex flex-wrap gap-2">
            {severities.map(({ value, label }) => (
              <button
                key={value || 'all'}
                onClick={() => onSeverityChange(value)}
                className={cn(
                  'px-3 py-2 rounded-full text-sm font-medium transition-all',
                  selectedSeverity === value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
