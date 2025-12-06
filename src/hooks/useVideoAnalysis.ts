import { useState, useCallback } from 'react';
import { uploadVideo, generateCaptions, summarizeVideo, chatCompletion, FOREST_PROMPTS } from '@/lib/vss-api';
import type { AnalysisResult, TimelineEvent, RiskCategory } from '@/types/analysis';
import { extractFrameAtTimestamp, createVideoBlobUrl } from '@/lib/video-utils';
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

  const analyzeVideo = useCallback(async (file: File): Promise<AnalysisResult | null> => {
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
      toast.info('Uploading video to VSS...');
      setAnalysis(prev => prev ? { ...prev, progress: 10 } : null);
      
      console.log('Starting video upload...');
      const uploadResult = await uploadVideo(file);
      console.log('Upload result:', uploadResult);
      
      const fileId = uploadResult.id || uploadResult.file_id;
      if (!fileId) {
        throw new Error('No file ID returned from upload');
      }
      
      newAnalysis.fileId = fileId;
      
      setAnalysis(prev => prev ? { 
        ...prev, 
        fileId: fileId,
        progress: 20,
        status: 'processing'
      } : null);

      // Step 2: Generate captions (20-50%)
      toast.info('Generating captions with VSS...');
      setAnalysis(prev => prev ? { ...prev, progress: 35 } : null);
      
      console.log('Generating captions for file:', fileId);
      const captionResult = await generateCaptions(fileId);
      console.log('Caption result:', captionResult);
      
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
      console.log('Summarizing with prompt...');
      const summarizeResult = await summarizeVideo(fileId, summarizePrompt);
      console.log('Summarize result:', summarizeResult);
      
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
      console.log('Aggregating categories...');
      const aggregateResult = await chatCompletion(fileId, aggregatePrompt);
      console.log('Aggregate result:', aggregateResult);
      
      const aggregated = aggregateResult.choices?.[0]?.message?.content || '';
      
      // Parse the aggregated results into events
      const events = parseAggregatedResults(aggregated);
      console.log('Parsed events:', events);
      
      // Store video blob URL for frame extraction
      const videoUrl = createVideoBlobUrl(file);
      
      // Extract frames for wildlife events (90-100%)
      setAnalysis(prev => prev ? { ...prev, progress: 90 } : null);
      toast.info('Extracting frames for wildlife detections...');
      
      const eventsWithFrames = await Promise.all(
        events.map(async (event) => {
          // Only extract frames for wildlife events
          if (event.category === 'wildlife') {
            try {
              console.log(`Extracting frame for wildlife event at ${event.startTime}`);
              const frameUrl = await extractFrameAtTimestamp(file, event.startTime);
              return { ...event, frameUrl };
            } catch (error) {
              console.error(`Failed to extract frame for event ${event.id}:`, error);
              // Continue without frame if extraction fails
              return event;
            }
          }
          return event;
        })
      );
      
      const completedAnalysis: AnalysisResult = {
        ...newAnalysis,
        aggregated,
        events: eventsWithFrames,
        videoUrl,
        progress: 100,
        status: 'completed',
        completedAt: new Date()
      };
      
      setAnalysis(completedAnalysis);
      toast.success(`Analysis complete! Detected ${events.length} events.`);
      
      return completedAnalysis;
      
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysis(prev => prev ? { 
        ...prev, 
        status: 'error',
        progress: 0
      } : null);
      toast.error(error instanceof Error ? error.message : 'Analysis failed');
      return null;
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
