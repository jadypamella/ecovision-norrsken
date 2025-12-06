import { Layout } from '@/components/layout/Layout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { EventChart } from '@/components/dashboard/EventChart';
import { SeverityChart } from '@/components/dashboard/SeverityChart';
import { VSSPipeline } from '@/components/dashboard/VSSPipeline';
import { RecentEvents } from '@/components/dashboard/RecentEvents';
import EventLocationMap from '@/components/map/EventLocationMap';
import { useAnalysis } from '@/contexts/AnalysisContext';
import { AlertTriangle, AlertCircle, Video, Flame, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { getStats, events } = useAnalysis();
  const stats = getStats();

  const hasEvents = events.length > 0;

  return (
    <Layout>
      <div className="min-h-screen bg-background py-8">
        <div className="section-container">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Safety Dashboard</h1>
            <p className="text-muted-foreground">Real-time forest monitoring insights powered by NVIDIA VSS</p>
          </div>

          {!hasEvents ? (
            // Empty State
            <div className="eco-card text-center py-16">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">No Analysis Data Yet</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Upload and analyze drone footage to see real-time safety insights and event detection powered by NVIDIA VSS.
              </p>
              <Link to="/upload" className="btn-primary inline-flex">
                <Video className="w-5 h-5" />
                Upload Video for Analysis
              </Link>
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard
                  title="Total Events"
                  value={stats.total_events}
                  icon={<AlertTriangle className="w-6 h-6 text-primary" />}
                />
                <StatsCard
                  title="High Severity"
                  value={stats.events_by_severity.high}
                  icon={<AlertCircle className="w-6 h-6 text-severity-high" />}
                />
                <StatsCard
                  title="Videos Analyzed"
                  value={stats.total_flights}
                  icon={<Video className="w-6 h-6 text-storm" />}
                />
                <StatsCard
                  title="Fire Events"
                  value={stats.events_by_type.fire || 0}
                  icon={<Flame className="w-6 h-6 text-fire" />}
                  subtitle={stats.events_by_type.fire > 0 ? "Requires attention" : undefined}
                />
              </div>

              {/* Charts */}
              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                <EventChart data={stats.events_by_type} />
                <SeverityChart data={stats.events_by_severity} />
              </div>

              {/* Event Location Map */}
              <div className="mb-8">
                <EventLocationMap 
                  events={events.map(e => ({
                    id: e.id,
                    title: e.title,
                    type: e.type,
                    lat: 0,
                    lng: 0,
                  }))}
                />
              </div>

              {/* VSS Pipeline */}
              <div className="mb-8">
                <VSSPipeline />
              </div>

              {/* Recent Events */}
              <RecentEvents events={stats.recent_events} />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
