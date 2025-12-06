export type EventType = 'fire' | 'deforestation' | 'storm' | 'wildlife';
export type Severity = 'high' | 'medium' | 'low';

export interface SafetyEvent {
  id: string;
  type: EventType;
  title: string;
  description: string;
  severity: Severity;
  confidence: number;
  timestamp: string;
  location?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  thumbnailUrl?: string;
  videoClipUrl?: string;
  flightId?: string;
}

export interface DashboardStats {
  total_events: number;
  total_flights: number;
  events_by_type: Record<EventType, number>;
  events_by_severity: Record<Severity, number>;
  recent_events: SafetyEvent[];
}

export interface Flight {
  id: string;
  name: string;
  date: string;
  duration: number;
  eventsCount: number;
  status: 'processing' | 'completed' | 'failed';
}

export interface UploadResponse {
  success: boolean;
  flightId: string;
  events: SafetyEvent[];
  message: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  fill?: string;
}
