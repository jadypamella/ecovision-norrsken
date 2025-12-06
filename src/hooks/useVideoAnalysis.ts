import { useState, useCallback } from 'react';
import { uploadVideo, generateCaptions, summarizeVideo, chatCompletion, FOREST_PROMPTS } from '@/lib/vss-api';
import type { AnalysisResult, TimelineEvent, RiskCategory } from '@/types/analysis';
import { toast } from 'sonner';

function parseAggregatedResults(text: string): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  const lines = text.split('\n').filter(line => line.trim().startsWith('-'));

  lines.forEach((line, index) => {
    // Pattern: - Category Name: start_time:end_time: description
    const match = line.match(/^-\s*(.+?):\s*(\d+(?:\.\d+)?(?::\d+(?:\.\d+)?)*):(\d+(?:\.\d+)?(?::\d+(?:\.\d+)?)*):?\s*(.+)?$/);
    
    if (match) {
      const [, categoryName, startTime, endTime, description] = match;
      
      // Map category name to our enum
      let category: RiskCategory = 'safe_human';
      let riskLevel: 'low' | 'medium' | 'high' = 'low';

      const lowerCategory = categoryName.toLowerCase();
      
      if (lowerCategory.includes('wildfire') || lowerCategory.includes('fire risk')) {
        category = 'wildfire';
        riskLevel = 'high';
      } else if (lowerCategory.includes('poach')) {
        category = 'poaching';
        riskLevel = 'high';
      } else if (lowerCategory.includes('logging') || lowerCategory.includes('illegal')) {
        category = 'logging';
        riskLevel = 'medium';
      } else if (lowerCategory.includes('wildlife') || lowerCategory.includes('animal')) {
        category = 'wildlife';
        riskLevel = 'low';
      } else if (lowerCategory.includes('safe') || lowerCategory.includes('human')) {
        category = 'safe_human';
        riskLevel = 'low';
      }

      events.push({
        id: `event-${index}`,
        startTime: startTime.replace(/\./g, ':'),
        endTime: endTime.replace(/\./g, ':'),
        category,
        description: description?.trim() || categoryName.trim(),
        riskLevel,
      });
    }
  });

  return events;
}

export function useVideoAnalysis() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const analyzeVideo = useCallback(async (file: File) => {
    setIsProcessing(true);
    
    const newAnalysis: AnalysisResult = {
      id: crypto.randomUUID(),
      fileName: file.name,
      fileId: '',
      status: 'uploading',
      progress: 0,
      events: [],
      createdAt: new Date(),
    };
    
    setAnalysis(newAnalysis);

    try {
      // Step 1: Upload video (0-20%)
      toast.info('Uploading video...');
      setAnalysis(prev => prev ? { ...prev, progress: 10 } : null);
      
      const uploadResult = await uploadVideo(file);
      const fileId = uploadResult.id || uploadResult.file_id;
      newAnalysis.fileId = fileId;
      
      setAnalysis(prev => prev ? { 
        ...prev, 
        fileId: fileId,
        progress: 20,
        status: 'processing'
      } : null);

      // Step 2: Generate captions (20-50%)
      toast.info('Generating captions...');
      setAnalysis(prev => prev ? { ...prev, progress: 35 } : null);
      
      const captionResult = await generateCaptions(fileId);
      const rawCaptions = captionResult.caption || captionResult.summary || '';
      
      setAnalysis(prev => prev ? { 
        ...prev, 
        rawCaptions,
        progress: 50 
      } : null);

      // Step 3: Summarize events with enable_chat (50-75%)
      toast.info('Summarizing events...');
      setAnalysis(prev => prev ? { ...prev, progress: 60 } : null);
      
      const summarizePrompt = FOREST_PROMPTS.summarize.replace('{captions}', rawCaptions);
      const summarizeResult = await summarizeVideo(fileId, summarizePrompt);
      const summary = summarizeResult.summary || summarizeResult.caption || '';
      
      setAnalysis(prev => prev ? { 
        ...prev, 
        summary,
        progress: 75 
      } : null);

      // Step 4: Aggregate into categories using chat (75-100%)
      toast.info('Categorizing risks...');
      setAnalysis(prev => prev ? { ...prev, progress: 85 } : null);
      
      const aggregatePrompt = FOREST_PROMPTS.aggregate.replace('{summaries}', summary);
      const aggregateResult = await chatCompletion(fileId, aggregatePrompt);
      const aggregated = aggregateResult.choices[0]?.message?.content || '';
      
      // Parse the aggregated results into events
      const events = parseAggregatedResults(aggregated);
      
      setAnalysis(prev => prev ? { 
        ...prev, 
        aggregated,
        events,
        progress: 100,
        status: 'completed',
        completedAt: new Date()
      } : null);

      toast.success('Analysis complete!');
      
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysis(prev => prev ? { 
        ...prev, 
        status: 'error',
        progress: 0
      } : null);
      toast.error(error instanceof Error ? error.message : 'Analysis failed');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const resetAnalysis = useCallback(() => {
    setAnalysis(null);
    setIsProcessing(false);
  }, []);

  return {
    analysis,
    isProcessing,
    analyzeVideo,
    resetAnalysis,
  };
}
