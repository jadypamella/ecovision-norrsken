import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { EventTypeBadge, SeverityBadge, getEventIcon } from '@/components/common/EventBadge';
import { PageLoading } from '@/components/common/Loading';
import { getEventById } from '@/services/api';
import type { SafetyEvent } from '@/types';
import { ArrowLeft, Clock, MapPin, Percent, Video, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<SafetyEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (error) {
        console.error('Failed to fetch event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <PageLoading />
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <AlertTriangle className="w-12 h-12 text-muted-foreground/50 mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Event not found</h2>
          <p className="text-muted-foreground mb-4">The event you're looking for doesn't exist</p>
          <Link to="/timeline" className="btn-primary">
            <ArrowLeft className="w-4 h-4" />
            Back to Timeline
          </Link>
        </div>
      </Layout>
    );
  }

  const Icon = getEventIcon(event.type);

  return (
    <Layout>
      <div className="min-h-screen bg-background py-8">
        <div className="section-container max-w-4xl">
          {/* Back link */}
          <Link 
            to="/timeline" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Timeline
          </Link>

          {/* Event Header */}
          <div className="eco-card mb-6">
            {/* Colored accent */}
            <div className={cn(
              'h-2 -mx-6 -mt-6 mb-6 rounded-t-xl',
              event.type === 'fire' && 'bg-fire',
              event.type === 'deforestation' && 'bg-deforestation',
              event.type === 'storm' && 'bg-storm',
              event.type === 'wildlife' && 'bg-wildlife',
            )} />

            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              {/* Icon */}
              <div className={cn(
                'w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0',
                event.type === 'fire' && 'bg-fire-bg',
                event.type === 'deforestation' && 'bg-deforestation-bg',
                event.type === 'storm' && 'bg-storm-bg',
                event.type === 'wildlife' && 'bg-wildlife-bg',
              )}>
                <Icon className={cn(
                  'w-8 h-8',
                  event.type === 'fire' && 'text-fire',
                  event.type === 'deforestation' && 'text-deforestation',
                  event.type === 'storm' && 'text-storm',
                  event.type === 'wildlife' && 'text-wildlife',
                )} />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <EventTypeBadge type={event.type} />
                  <SeverityBadge severity={event.severity} />
                </div>
                
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                  {event.title}
                </h1>
                
                <p className="text-muted-foreground">
                  {event.description}
                </p>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            {/* Metadata */}
            <div className="eco-card">
              <h3 className="font-semibold text-foreground mb-4">Event Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Detected</p>
                    <p className="font-medium text-foreground">{formatTimestamp(event.timestamp)}</p>
                  </div>
                </div>

                {event.location && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium text-foreground">{event.location}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Percent className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">AI Confidence</p>
                    <p className="font-medium text-foreground">{Math.round(event.confidence * 100)}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Preview */}
            <div className="eco-card">
              <h3 className="font-semibold text-foreground mb-4">Video Evidence</h3>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Video className="w-12 h-12 text-muted-foreground/50 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Video clip not available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <Link to="/timeline" className="btn-secondary">
              <ArrowLeft className="w-4 h-4" />
              Back to Timeline
            </Link>
            <Link to="/dashboard" className="btn-primary">
              View Dashboard
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetail;
