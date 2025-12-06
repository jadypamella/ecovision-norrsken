/**
 * Utility functions for video frame extraction using HTML5 Video API
 */

/**
 * Parses a timestamp string (MM:SS or HH:MM:SS) to seconds
 */
export function parseTimestampToSeconds(timestamp: string): number {
  const parts = timestamp.split(':').map(Number);
  
  if (parts.length === 2) {
    // Format: MM:SS
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 3) {
    // Format: HH:MM:SS
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  
  // Try to parse as a single number (seconds)
  const parsed = parseFloat(timestamp);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Extracts a frame from a video file at a specific timestamp
 * @param videoFile - The video file to extract frame from
 * @param timestamp - Timestamp in format "MM:SS" or "HH:MM:SS"
 * @param quality - JPEG quality (0-1), default 0.8
 * @returns Promise that resolves to a data URL of the extracted frame
 */
export async function extractFrameAtTimestamp(
  videoFile: File,
  timestamp: string,
  quality: number = 0.8
): Promise<string> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }
    
    // Set up video element
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = 'anonymous';
    
    const videoUrl = URL.createObjectURL(videoFile);
    video.src = videoUrl;
    
    // Error handler
    const handleError = (error: Error | Event) => {
      URL.revokeObjectURL(videoUrl);
      video.remove();
      canvas.remove();
      reject(error instanceof Error ? error : new Error('Failed to extract frame'));
    };
    
    video.onerror = () => handleError(new Error('Video loading failed'));
    
    // Once metadata is loaded, seek to the timestamp
    video.onloadedmetadata = () => {
      try {
        const seconds = parseTimestampToSeconds(timestamp);
        
        // Ensure timestamp is within video duration
        if (seconds < 0) {
          video.currentTime = 0;
        } else if (seconds > video.duration) {
          video.currentTime = video.duration - 0.1; // Use last frame if timestamp exceeds duration
        } else {
          video.currentTime = seconds;
        }
      } catch (error) {
        handleError(error instanceof Error ? error : new Error('Failed to parse timestamp'));
      }
    };
    
    // Once video has seeked to the timestamp, capture the frame
    video.onseeked = () => {
      try {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw the current video frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to data URL (JPEG)
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        
        // Cleanup
        URL.revokeObjectURL(videoUrl);
        video.remove();
        canvas.remove();
        
        resolve(dataUrl);
      } catch (error) {
        handleError(error instanceof Error ? error : new Error('Failed to capture frame'));
      }
    };
    
    // Load the video
    video.load();
  });
}

/**
 * Creates a blob URL from a video file for later use
 * @param videoFile - The video file
 * @returns Blob URL string
 */
export function createVideoBlobUrl(videoFile: File): string {
  return URL.createObjectURL(videoFile);
}

/**
 * Revokes a blob URL to free up memory
 * @param url - The blob URL to revoke
 */
export function revokeBlobUrl(url: string): void {
  URL.revokeObjectURL(url);
}


