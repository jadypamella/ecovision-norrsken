import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { SafetyEvent, DashboardStats, EventType, Severity } from '@/types';
import type { AnalysisResult, TimelineEvent } from '@/types/analysis';

interface AnalysisContextType {
  // Current analysis state
  currentAnalysis: AnalysisResult | null;
  isProcessing: boolean;
  
  // All analyzed events (persisted in session)
  events: SafetyEvent[];
  
  // Actions
  setCurrentAnalysis: (analysis: AnalysisResult | null) => void;
  setIsProcessing: (processing: boolean) => void;
  addEventsFromAnalysis: (analysis: AnalysisResult) => void;
  clearEvents: () => void;
  
  // Computed stats
  getStats: () => DashboardStats;
  getFilteredEvents: (type?: EventType | '', severity?: Severity | '') => SafetyEvent[];
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

// Convert TimelineEvent to SafetyEvent
function convertToSafetyEvent(event: TimelineEvent, analysisId: string, fileName: string): SafetyEvent {
  const typeMap: Record<string, EventType> = {
    wildfire: 'fire',
    poaching: 'wildlife',
    logging: 'deforestation',
    wildlife: 'wildlife',
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
    poaching: 'Potential Poaching Activity',
    logging: 'Illegal Logging Activity',
    wildlife: 'Wildlife Sighting',
    safe_human: 'Safe Human Activity',
  };
  return titles[category] || 'Event Detected';
}

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [events, setEvents] = useState<SafetyEvent[]>([]);

  const addEventsFromAnalysis = useCallback((analysis: AnalysisResult) => {
    if (!analysis.events || analysis.events.length === 0) return;
    
    const newEvents = analysis.events.map(event => 
      convertToSafetyEvent(event, analysis.id, analysis.fileName)
    );
    
    setEvents(prev => [...newEvents, ...prev]);
  }, []);

  const clearEvents = useCallback(() => {
    setEvents([]);
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
      total_flights: Math.max(1, Math.ceil(events.length / 5)),
      events_by_type: eventsByType,
      events_by_severity: eventsBySeverity,
      recent_events: events.slice(0, 4),
    };
  }, [events]);

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

  return (
    <AnalysisContext.Provider value={{
      currentAnalysis,
      isProcessing,
      events,
      setCurrentAnalysis,
      setIsProcessing,
      addEventsFromAnalysis,
      clearEvents,
      getStats,
      getFilteredEvents,
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
