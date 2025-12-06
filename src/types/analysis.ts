export type RiskCategory = 
  | 'wildfire'
  | 'poaching'
  | 'logging'
  | 'safe_human'
  | 'wildlife';

export interface TimelineEvent {
  id: string;
  startTime: string;
  endTime: string;
  category: RiskCategory;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  frameUrl?: string; // Data URL of extracted frame (for wildlife events)
}

export interface AnalysisResult {
  id: string;
  fileName: string;
  fileId: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  events: TimelineEvent[];
  rawCaptions?: string;
  summary?: string;
  aggregated?: string;
  createdAt: Date;
  completedAt?: Date;
  videoUrl?: string; // Blob URL of the original video file for frame extraction
}

export interface FileUploadResponse {
  file_id: string;
  file_path: string;
  caption: string;
  status: string;
  duration: number;
}

export const RISK_CATEGORIES: Record<RiskCategory, {
  label: string;
  color: string;
  bgColor: string;
  icon: string;
}> = {
  wildfire: {
    label: 'Wildfire Risk',
    color: 'text-danger',
    bgColor: 'bg-danger/20',
    icon: '🔥',
  },
  poaching: {
    label: 'Poaching Activity',
    color: 'text-amber',
    bgColor: 'bg-amber/20',
    icon: '⚠️',
  },
  logging: {
    label: 'Illegal Logging',
    color: 'text-amber',
    bgColor: 'bg-amber/20',
    icon: '🪓',
  },
  safe_human: {
    label: 'Safe Human Activity',
    color: 'text-forest',
    bgColor: 'bg-forest/20',
    icon: '👥',
  },
  wildlife: {
    label: 'Wildlife Monitoring',
    color: 'text-sky',
    bgColor: 'bg-sky/20',
    icon: '🦌',
  },
};
