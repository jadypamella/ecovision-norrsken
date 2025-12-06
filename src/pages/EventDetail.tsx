import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { EventTypeBadge, SeverityBadge, getEventIcon } from '@/components/common/EventBadge';
import { useAnalysis } from '@/contexts/AnalysisContext';
import { ArrowLeft, Clock, MapPin, Percent, Video, AlertTriangle, FileVideo } from 'lucide-react';
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
  const { getEventById, events } = useAnalysis();
  
  const event = id ? getEventById(id) : null;

  if (!event) {
    const hasEvents = events.length > 0;
    
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <AlertTriangle className="w-12 h-12 text-muted-foreground/50 mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Event not found</h2>
          <p className="text-muted-foreground mb-4 text-center max-w-md">
            {hasEvents 
              ? "This event doesn't exist in the current session. Events are stored temporarily during your session."
              : "No events have been analyzed yet. Upload a video to detect forest safety events."
            }
          </p>
          <Link to={hasEvents ? "/timeline" : "/upload"} className="btn-primary">
            <ArrowLeft className="w-4 h-4" />
            {hasEvents ? "Back to Timeline" : "Upload Video"}
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
                      <FileVideo className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Video Source & Timestamp</p>
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

            {/* VSS Analysis Info */}
            <div className="eco-card">
              <h3 className="font-semibold text-foreground mb-4">VSS Analysis</h3>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Detection Type</p>
                  <p className="font-medium text-foreground capitalize">{event.type.replace('_', ' ')}</p>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Risk Level</p>
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      'w-3 h-3 rounded-full',
                      event.severity === 'high' && 'bg-red-500',
                      event.severity === 'medium' && 'bg-yellow-500',
                      event.severity === 'low' && 'bg-green-500',
                    )} />
                    <p className="font-medium text-foreground capitalize">{event.severity}</p>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Analysis Summary</p>
                  <p className="text-sm text-foreground">{event.description}</p>
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
