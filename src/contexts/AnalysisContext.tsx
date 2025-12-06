import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { SafetyEvent, DashboardStats, EventType, Severity } from '@/types';
import type { AnalysisResult, TimelineEvent } from '@/types/analysis';

interface AnalysisContextType {
  // Current analysis state
  currentAnalysis: AnalysisResult | null;
  isProcessing: boolean;
  
  // All analyzed events (persisted in session)
  events: SafetyEvent[];
  
  // Track analyzed videos
  analyzedVideos: string[];
  
  // Actions
  setCurrentAnalysis: (analysis: AnalysisResult | null) => void;
  setIsProcessing: (processing: boolean) => void;
  addEventsFromAnalysis: (analysis: AnalysisResult) => void;
  clearEvents: () => void;
  
  // Computed stats
  getStats: () => DashboardStats;
  getFilteredEvents: (type?: EventType | '', severity?: Severity | '') => SafetyEvent[];
  getEventById: (id: string) => SafetyEvent | null;
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

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [events, setEvents] = useState<SafetyEvent[]>([]);
  const [analyzedVideos, setAnalyzedVideos] = useState<string[]>([]);

  const addEventsFromAnalysis = useCallback((analysis: AnalysisResult) => {
    // Track this video as analyzed
    setAnalyzedVideos(prev => {
      if (!prev.includes(analysis.fileName)) {
        return [...prev, analysis.fileName];
      }
      return prev;
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

  return (
    <AnalysisContext.Provider value={{
      currentAnalysis,
      isProcessing,
      events,
      analyzedVideos,
      setCurrentAnalysis,
      setIsProcessing,
      addEventsFromAnalysis,
      clearEvents,
      getStats,
      getFilteredEvents,
      getEventById,
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
