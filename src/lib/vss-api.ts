import { supabase } from '@/integrations/supabase/client';

export const FOREST_PROMPTS = {
  caption: `Write a concise and clear dense caption for the provided forest monitoring video. 
Focus on narrating the scene to distinguish context.
- Distinguish "fire" contexts: controlled burn/campfire vs. wildfire. Look for containment (stone rings) and human presence.
- Distinguish "human" contexts: tourist/hiker vs. poacher/logger. Look for objects held (camera vs. rifle/tools) and behavior (calm vs. stealthy/aggressive).
- Distinguish "animal" contexts: natural behavior vs. distress.

Format: Start and end each sentence with a time stamp. Ensure description includes the reasoning (e.g., "Humans seated calm near contained fire -> Low Risk").`,

  summarize: `You should summarize the following forest events in the format start_time:end_time:caption. 
For start_time and end_time use . to seperate seconds, minutes, hours.
If during a time segment only regular/safe activities happen (e.g., normal wildlife movement, tourists with cameras, contained campfires), note them as "Safe Activity".
If IRREGULAR or HIGH RISK activities happen (e.g., uncontained fire, humans with weapons, logging machinery), detail them specifically.

The output should be bullet points in the format start_time:end_time: detailed_event_description_with_risk_assessment.
Don't return anything else except the bullet points.

Events to summarize:
{captions}`,

  aggregate: `You are a forest monitoring system. Given the caption in the form start_time:end_time: caption, Aggregate the following captions into specific risk categories.

Categories:
1. Wildfire Risk (Uncontained fire, smoke rising from vegetation)
2. Poaching Activity (Humans with weapons, stealthy behavior)
3. Illegal Logging (Humans with tools/machinery)
4. Safe Human Activity (Tourists, hikers, campfires)
5. Wildlife Monitoring (Animal sightings)

If an event continues across multiple timestamps, aggregate them: start_time1:end_timeK:event_description.
Output ONLY bullet points in format:
- Category Name: start_time:end_time: event_description

Captions to aggregate:
{summaries}`,
};

export interface UploadResponse {
  id: string;
  file_id?: string;
  file_path?: string;
  caption?: string;
  status?: string;
  duration?: number;
}

export interface SummarizeResponse {
  summary: string;
  caption?: string;
}

export interface ChatResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
}

const FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/vss-proxy`;

export async function uploadVideo(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('purpose', 'vision');
  formData.append('media_type', 'video');

  const response = await fetch(`${FUNCTION_URL}?action=upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Upload failed');
  }

  return response.json();
}

export async function getFileInfo(fileId: string): Promise<any> {
  const response = await fetch(`${FUNCTION_URL}?action=file-info&file_id=${fileId}`);
  
  if (!response.ok) {
    throw new Error('Failed to get file info');
  }

  return response.json();
}

export async function generateCaptions(fileId: string): Promise<SummarizeResponse> {
  const response = await fetch(`${FUNCTION_URL}?action=captions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      file_id: fileId,
      prompt: FOREST_PROMPTS.caption,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Caption generation failed');
  }

  return response.json();
}

export async function summarizeVideo(fileId: string, prompt: string): Promise<SummarizeResponse> {
  const response = await fetch(`${FUNCTION_URL}?action=summarize`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      file_id: fileId,
      prompt: prompt,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Summarization failed');
  }

  return response.json();
}

export async function chatCompletion(fileId: string, message: string): Promise<ChatResponse> {
  const response = await fetch(`${FUNCTION_URL}?action=chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      file_id: fileId,
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Chat completion failed');
  }

  return response.json();
}
