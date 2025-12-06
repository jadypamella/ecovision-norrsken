import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { EventCard } from '@/components/timeline/EventCard';
import { Filters } from '@/components/timeline/Filters';
import { useAnalysis } from '@/contexts/AnalysisContext';
import type { EventType, Severity } from '@/types';
import { Clock, Search, AlertCircle, Upload, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

const Timeline = () => {
  const { getFilteredEvents, events: allEvents } = useAnalysis();
  const [selectedType, setSelectedType] = useState<EventType | ''>('');
  const [selectedSeverity, setSelectedSeverity] = useState<Severity | ''>('');

  const events = getFilteredEvents(selectedType, selectedSeverity);
  const hasAnyEvents = allEvents.length > 0;

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
            <p className="text-muted-foreground">Browse and filter all detected safety events from VSS analysis</p>
          </div>

          {!hasAnyEvents ? (
            // Empty State
            <div className="eco-card text-center py-16">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">No Events Detected Yet</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Upload drone footage and run VSS analysis to detect and categorize safety events in your forest monitoring videos.
              </p>
              <Link to="/upload" className="btn-primary inline-flex">
                <Video className="w-5 h-5" />
                Upload Video for Analysis
              </Link>
            </div>
          ) : (
            <>
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
              {events.length === 0 ? (
                <div className="eco-card text-center py-12">
                  <AlertCircle className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">No events match your filters</h3>
                  <p className="text-muted-foreground text-sm">
                    Try adjusting your filters to see more events
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
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Timeline;
