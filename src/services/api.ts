import type { DashboardStats, SafetyEvent, UploadResponse } from '@/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8765';

// Mock data for development
const mockEvents: SafetyEvent[] = [
  {
    id: '1',
    type: 'fire',
    title: 'Active Wildfire Detected',
    description: 'Smoke and flames visible in sector 7. Immediate attention required.',
    severity: 'high',
    confidence: 0.94,
    timestamp: '2025-12-06T14:32:00Z',
    location: 'Amazon Sector 7',
  },
  {
    id: '2',
    type: 'deforestation',
    title: 'Illegal Logging Activity',
    description: 'Heavy machinery and cleared area detected near protected zone.',
    severity: 'high',
    confidence: 0.87,
    timestamp: '2025-12-06T12:15:00Z',
    location: 'Protected Zone B',
  },
  {
    id: '3',
    type: 'storm',
    title: 'Storm Damage Assessment',
    description: 'Multiple fallen trees blocking access routes after severe weather.',
    severity: 'medium',
    confidence: 0.91,
    timestamp: '2025-12-05T09:45:00Z',
    location: 'Northern Trail',
  },
  {
    id: '4',
    type: 'wildlife',
    title: 'Large Wildlife Movement',
    description: 'Elephant herd detected near village boundary. Potential conflict zone.',
    severity: 'medium',
    confidence: 0.82,
    timestamp: '2025-12-05T06:20:00Z',
    location: 'Village Boundary',
  },
  {
    id: '5',
    type: 'fire',
    title: 'Smoke Detection Alert',
    description: 'Early smoke signature detected. Monitoring for escalation.',
    severity: 'low',
    confidence: 0.76,
    timestamp: '2025-12-04T18:00:00Z',
    location: 'Sector 12',
  },
  {
    id: '6',
    type: 'wildlife',
    title: 'Rare Species Spotted',
    description: 'Jaguar sighting in conservation area. Updated tracking data.',
    severity: 'low',
    confidence: 0.89,
    timestamp: '2025-12-04T11:30:00Z',
    location: 'Conservation Zone A',
  },
];

const mockStats: DashboardStats = {
  total_events: 156,
  total_flights: 42,
  events_by_type: {
    fire: 28,
    deforestation: 45,
    storm: 38,
    wildlife: 45,
  },
  events_by_severity: {
    high: 23,
    medium: 67,
    low: 66,
  },
  recent_events: mockEvents.slice(0, 4),
};

export const getStats = async (): Promise<DashboardStats> => {
  try {
    const response = await fetch(`${API_URL}/api/stats`);
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  } catch {
    return mockStats;
  }
};

export const getEvents = async (params?: {
  event_type?: string;
  severity?: string;
  page?: number;
  limit?: number;
}): Promise<SafetyEvent[]> => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.event_type) queryParams.append('event_type', params.event_type);
    if (params?.severity) queryParams.append('severity', params.severity);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const response = await fetch(`${API_URL}/api/events?${queryParams}`);
    if (!response.ok) throw new Error('Failed to fetch events');
    return response.json();
  } catch {
    let filtered = [...mockEvents];
    if (params?.event_type) {
      filtered = filtered.filter(e => e.type === params.event_type);
    }
    if (params?.severity) {
      filtered = filtered.filter(e => e.severity === params.severity);
    }
    return filtered;
  }
};

export const getEventById = async (id: string): Promise<SafetyEvent | null> => {
  try {
    const response = await fetch(`${API_URL}/api/events/${id}`);
    if (!response.ok) throw new Error('Failed to fetch event');
    return response.json();
  } catch {
    return mockEvents.find(e => e.id === id) || null;
  }
};

export const uploadVideo = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<UploadResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100;
          onProgress?.(progress);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve({
              success: true,
              flightId: response.flight_id,
              events: response.events || [],
              message: response.message || 'Video analyzed successfully',
            });
          } catch (error) {
            reject(new Error('Failed to parse response'));
          }
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Upload failed'));
      });

      xhr.open('POST', `${API_URL}/api/upload`);
      xhr.send(formData);
    });
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};
