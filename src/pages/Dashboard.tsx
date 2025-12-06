import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { EventChart } from '@/components/dashboard/EventChart';
import { SeverityChart } from '@/components/dashboard/SeverityChart';
import { VSSPipeline } from '@/components/dashboard/VSSPipeline';
import { RecentEvents } from '@/components/dashboard/RecentEvents';
import { PageLoading } from '@/components/common/Loading';
import { getStats } from '@/services/api';
import type { DashboardStats } from '@/types';
import { AlertTriangle, AlertCircle, Video, Flame } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Layout>
        <PageLoading />
      </Layout>
    );
  }

  if (!stats) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <p className="text-muted-foreground">Failed to load dashboard data</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background py-8">
        <div className="section-container">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Safety Dashboard</h1>
            <p className="text-muted-foreground">Real-time forest monitoring insights powered by NVIDIA VSS</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Events"
              value={stats.total_events}
              icon={<AlertTriangle className="w-6 h-6 text-primary" />}
              trend="+12%"
              trendUp
            />
            <StatsCard
              title="High Severity"
              value={stats.events_by_severity.high}
              icon={<AlertCircle className="w-6 h-6 text-severity-high" />}
              trend="-5%"
              trendUp={false}
            />
            <StatsCard
              title="Flights Analyzed"
              value={stats.total_flights}
              icon={<Video className="w-6 h-6 text-storm" />}
              trend="+8%"
              trendUp
            />
            <StatsCard
              title="Active Fires"
              value={stats.events_by_type.fire || 0}
              icon={<Flame className="w-6 h-6 text-fire" />}
              subtitle="Requires attention"
            />
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <EventChart data={stats.events_by_type} />
            <SeverityChart data={stats.events_by_severity} />
          </div>

          {/* VSS Pipeline */}
          <div className="mb-8">
            <VSSPipeline />
          </div>

          {/* Recent Events */}
          <RecentEvents events={stats.recent_events} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
