import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { EventCard } from '@/components/timeline/EventCard';
import { Filters } from '@/components/timeline/Filters';
import { PageLoading } from '@/components/common/Loading';
import { getEvents } from '@/services/api';
import type { SafetyEvent, EventType, Severity } from '@/types';
import { Clock, Search, AlertCircle } from 'lucide-react';

const Timeline = () => {
  const [events, setEvents] = useState<SafetyEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<EventType | ''>('');
  const [selectedSeverity, setSelectedSeverity] = useState<Severity | ''>('');

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const data = await getEvents({
          event_type: selectedType || undefined,
          severity: selectedSeverity || undefined,
        });
        setEvents(data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [selectedType, selectedSeverity]);

  return (
    <Layout>
      <div className="min-h-screen bg-background py-8">
        <div className="section-container">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Event Timeline</h1>
            </div>
            <p className="text-muted-foreground">Browse and filter all detected safety events</p>
          </div>

          {/* Filters */}
          <Filters
            selectedType={selectedType}
            selectedSeverity={selectedSeverity}
            onTypeChange={setSelectedType}
            onSeverityChange={setSelectedSeverity}
          />

          {/* Results Count */}
          <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
            <Search className="w-4 h-4" />
            <span>{events.length} events found</span>
          </div>

          {/* Events Grid */}
          {loading ? (
            <PageLoading />
          ) : events.length === 0 ? (
            <div className="eco-card text-center py-12">
              <AlertCircle className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">No events found</h3>
              <p className="text-muted-foreground text-sm">
                Try adjusting your filters or upload new drone footage to detect events
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Timeline;
