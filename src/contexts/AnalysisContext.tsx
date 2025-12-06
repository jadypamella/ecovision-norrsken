import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import type { SafetyEvent, DashboardStats, EventType, Severity } from '@/types';
import type { AnalysisResult, TimelineEvent } from '@/types/analysis';

// Storage keys
const STORAGE_KEYS = {
  events: 'ecovision_events',
  analyzedVideos: 'ecovision_analyzed_videos',
  analyses: 'ecovision_analyses',
};

interface AnalysisContextType {
  // Current analysis state
  currentAnalysis: AnalysisResult | null;
  isProcessing: boolean;
  
  // All analyzed events (persisted)
  events: SafetyEvent[];
  
  // Track analyzed videos
  analyzedVideos: string[];
  
  // All completed analyses with raw VSS data
  analyses: AnalysisResult[];
  
  // Actions
  setCurrentAnalysis: (analysis: AnalysisResult | null) => void;
  setIsProcessing: (processing: boolean) => void;
  addEventsFromAnalysis: (analysis: AnalysisResult) => void;
  clearEvents: () => void;
  
  // Computed stats
  getStats: () => DashboardStats;
  getFilteredEvents: (type?: EventType | '', severity?: Severity | '') => SafetyEvent[];
  getEventById: (id: string) => SafetyEvent | null;
  getAnalysisById: (id: string) => AnalysisResult | null;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

// Convert TimelineEvent to SafetyEvent
function convertToSafetyEvent(event: TimelineEvent, analysisId: string, fileName: string): SafetyEvent {
  const typeMap: Record<string, EventType> = {
    wildfire: 'fire',
    fire: 'fire',
    poaching: 'wildlife',
    logging: 'deforestation',
    deforestation: 'deforestation',
    wildlife: 'wildlife',
    storm: 'storm',
    safe_human: 'wildlife',
  };

  const severityMap: Record<string, Severity> = {
    high: 'high',
    medium: 'medium',
    low: 'low',
  };

  return {
    id: `${analysisId}-${event.id}`,
    type: typeMap[event.category] || 'wildlife',
    title: getCategoryTitle(event.category),
    description: event.description,
    severity: severityMap[event.riskLevel] || 'low',
    confidence: event.riskLevel === 'high' ? 0.9 : event.riskLevel === 'medium' ? 0.75 : 0.6,
    timestamp: new Date().toISOString(),
    location: `${fileName} (${event.startTime} - ${event.endTime})`,
    flightId: analysisId, // Link to the analysis
  };
}

function getCategoryTitle(category: string): string {
  const titles: Record<string, string> = {
    wildfire: 'Wildfire Risk Detected',
    fire: 'Fire Detected',
    poaching: 'Potential Poaching Activity',
    logging: 'Illegal Logging Activity',
    deforestation: 'Deforestation Activity',
    wildlife: 'Wildlife Sighting',
    storm: 'Storm Damage Detected',
    safe_human: 'Safe Human Activity',
  };
  return titles[category] || 'Event Detected';
}

// Helper to serialize Date objects for localStorage
function serializeAnalysis(analysis: AnalysisResult): string {
  return JSON.stringify({
    ...analysis,
    createdAt: analysis.createdAt instanceof Date ? analysis.createdAt.toISOString() : analysis.createdAt,
    completedAt: analysis.completedAt instanceof Date ? analysis.completedAt.toISOString() : analysis.completedAt,
  });
}

// Helper to deserialize Date objects from localStorage
function deserializeAnalysis(json: string): AnalysisResult {
  const data = JSON.parse(json);
  return {
    ...data,
    createdAt: new Date(data.createdAt),
    completedAt: data.completedAt ? new Date(data.completedAt) : undefined,
  };
}

// Load from localStorage
function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return defaultValue;
    return JSON.parse(stored);
  } catch (error) {
    console.error(`Error loading ${key} from storage:`, error);
    return defaultValue;
  }
}

// Load analyses from localStorage (handles Date serialization)
function loadAnalyses(): AnalysisResult[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.analyses);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return parsed.map((item: string) => deserializeAnalysis(item));
  } catch (error) {
    console.error('Error loading analyses from storage:', error);
    return [];
  }
}

// Save analyses to localStorage (handles Date serialization)
function saveAnalyses(analyses: AnalysisResult[]): void {
  try {
    const serialized = analyses.map(a => serializeAnalysis(a));
    localStorage.setItem(STORAGE_KEYS.analyses, JSON.stringify(serialized));
  } catch (error) {
    console.error('Error saving analyses to storage:', error);
  }
}

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [events, setEvents] = useState<SafetyEvent[]>(() => 
    loadFromStorage<SafetyEvent[]>(STORAGE_KEYS.events, [])
  );
  const [analyzedVideos, setAnalyzedVideos] = useState<string[]>(() => 
    loadFromStorage<string[]>(STORAGE_KEYS.analyzedVideos, [])
  );
  const [analyses, setAnalyses] = useState<AnalysisResult[]>(() => loadAnalyses());

  // Persist events to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.events, JSON.stringify(events));
  }, [events]);

  // Persist analyzed videos to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.analyzedVideos, JSON.stringify(analyzedVideos));
  }, [analyzedVideos]);

  // Persist analyses to localStorage
  useEffect(() => {
    saveAnalyses(analyses);
  }, [analyses]);

  const addEventsFromAnalysis = useCallback((analysis: AnalysisResult) => {
    console.log('Adding analysis to storage:', analysis);
    
    // Track this video as analyzed
    setAnalyzedVideos(prev => {
      if (!prev.includes(analysis.fileName)) {
        return [...prev, analysis.fileName];
      }
      return prev;
    });

    // Save the complete analysis with all VSS data
    setAnalyses(prev => {
      // Check if this analysis already exists
      const exists = prev.some(a => a.id === analysis.id);
      if (exists) {
        return prev.map(a => a.id === analysis.id ? analysis : a);
      }
      return [analysis, ...prev];
    });

    if (!analysis.events || analysis.events.length === 0) return;
    
    const newEvents = analysis.events.map(event => 
      convertToSafetyEvent(event, analysis.id, analysis.fileName)
    );
    
    setEvents(prev => [...newEvents, ...prev]);
  }, []);

  const clearEvents = useCallback(() => {
    setEvents([]);
    setAnalyzedVideos([]);
    setAnalyses([]);
    localStorage.removeItem(STORAGE_KEYS.events);
    localStorage.removeItem(STORAGE_KEYS.analyzedVideos);
    localStorage.removeItem(STORAGE_KEYS.analyses);
  }, []);

  const getStats = useCallback((): DashboardStats => {
    const eventsByType: Record<EventType, number> = {
      fire: 0,
      deforestation: 0,
      storm: 0,
      wildlife: 0,
    };

    const eventsBySeverity: Record<Severity, number> = {
      high: 0,
      medium: 0,
      low: 0,
    };

    events.forEach(event => {
      eventsByType[event.type]++;
      eventsBySeverity[event.severity]++;
    });

    return {
      total_events: events.length,
      total_flights: analyzedVideos.length,
      events_by_type: eventsByType,
      events_by_severity: eventsBySeverity,
      recent_events: events.slice(0, 4),
    };
  }, [events, analyzedVideos]);

  const getFilteredEvents = useCallback((type?: EventType | '', severity?: Severity | ''): SafetyEvent[] => {
    let filtered = [...events];
    
    if (type) {
      filtered = filtered.filter(e => e.type === type);
    }
    
    if (severity) {
      filtered = filtered.filter(e => e.severity === severity);
    }
    
    return filtered;
  }, [events]);

  const getEventById = useCallback((id: string): SafetyEvent | null => {
    return events.find(e => e.id === id) || null;
  }, [events]);

  const getAnalysisById = useCallback((id: string): AnalysisResult | null => {
    // The event id format is "analysisId-eventId", so we extract the analysisId
    const analysisId = id.includes('-event-') ? id.split('-event-')[0] : id;
    return analyses.find(a => a.id === analysisId) || null;
  }, [analyses]);

  return (
    <AnalysisContext.Provider value={{
      currentAnalysis,
      isProcessing,
      events,
      analyzedVideos,
      analyses,
      setCurrentAnalysis,
      setIsProcessing,
      addEventsFromAnalysis,
      clearEvents,
      getStats,
      getFilteredEvents,
      getEventById,
      getAnalysisById,
    }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
}
