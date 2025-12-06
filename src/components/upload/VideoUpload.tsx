import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Video, Loader2, CheckCircle, AlertCircle, X } from 'lucide-react';
import { useVideoAnalysis } from '@/hooks/useVideoAnalysis';
import { useAnalysis } from '@/contexts/AnalysisContext';
import { cn } from '@/lib/utils';

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
const MIN_FILE_SIZE = 1024; // 1KB minimum

export const VideoUpload = () => {
  const navigate = useNavigate();
  const { analysis, isProcessing, analyzeVideo, resetAnalysis } = useVideoAnalysis();
  const { addEventsFromAnalysis } = useAnalysis();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith('video/')) {
      return 'Please upload a video file (MP4, AVI, MOV)';
    }
    if (file.size < MIN_FILE_SIZE) {
      return 'File is too small or empty. Please upload a valid video file.';
    }
    if (file.size > MAX_FILE_SIZE) {
      return `File is too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`;
    }
    return null;
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const validationError = validateFile(droppedFile);
      if (validationError) {
        setError(validationError);
        setFile(null);
      } else {
        setFile(droppedFile);
        setError(null);
      }
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const validationError = validateFile(selectedFile);
      if (validationError) {
        setError(validationError);
        setFile(null);
      } else {
        setFile(selectedFile);
        setError(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    const result = await analyzeVideo(file);
    
    // Add events to global context when analysis completes
    if (result && result.status === 'completed') {
      addEventsFromAnalysis(result);
    }
  };

  const handleReset = () => {
    setFile(null);
    setError(null);
    resetAnalysis();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) {
      return `${bytes} bytes`;
    }
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const isCompleted = analysis?.status === 'completed';
  const hasError = analysis?.status === 'error' || error;
  const progress = analysis?.progress || 0;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success State */}
      {isCompleted && (
        <div className="eco-card border-2 border-primary animate-scale-in">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-foreground text-lg mb-2">
                Analysis Complete
              </h3>
              <p className="text-muted-foreground mb-4">
                Your drone footage has been successfully analyzed using NVIDIA VSS.
                {analysis?.events && analysis.events.length > 0 && (
                  <> Detected {analysis.events.length} safety events.</>
                )}
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/timeline')}
                  className="btn-primary"
                >
                  View Events Timeline
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="btn-secondary"
                >
                  View Dashboard
                </button>
                <button
                  onClick={handleReset}
                  className="btn-secondary"
                >
                  Upload Another
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Zone */}
      {!isCompleted && (
        <>
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={cn(
              'eco-card border-2 border-dashed transition-all duration-300',
              isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-border hover:border-primary/50',
              isProcessing && 'pointer-events-none opacity-75'
            )}
          >
            <div className="text-center py-8">
              {file ? (
                <div className="animate-fade-in">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Video className="w-8 h-8 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground mb-1">{file.name}</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {formatFileSize(file.size)}
                  </p>
                  {!isProcessing && (
                    <button
                      onClick={handleReset}
                      className="text-sm text-muted-foreground hover:text-destructive flex items-center gap-1 mx-auto transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Remove
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-foreground font-medium mb-2">
                    Drag and drop your video file here
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    or click to browse files
                  </p>
                  <label className="btn-primary cursor-pointer">
                    <Upload className="w-4 h-4" />
                    Select Video File
                    <input
                      type="file"
                      accept="video/mp4,video/avi,video/quicktime,video/x-msvideo"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </label>
                  <p className="text-xs text-muted-foreground mt-4">
                    Supported formats: MP4, AVI, MOV (max 500MB)
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Error State */}
          {hasError && (
            <div className="eco-card mt-4 border-destructive/50 bg-destructive/5 animate-slide-up">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                <p className="text-destructive text-sm">{error || 'Upload failed. Please try again.'}</p>
              </div>
            </div>
          )}

          {/* Upload Button & Progress */}
          {file && !isProcessing && !hasError && (
            <div className="mt-6 animate-slide-up">
              <button
                onClick={handleUpload}
                className="btn-primary w-full justify-center"
              >
                <Video className="w-5 h-5" />
                Start AI Analysis
              </button>
            </div>
          )}

          {/* Processing State */}
          {isProcessing && (
            <div className="eco-card mt-6 animate-slide-up">
              <div className="flex items-center gap-4">
                <Loader2 className="w-6 h-6 text-primary animate-spin flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-foreground">
                      {analysis?.status === 'uploading' && 'Uploading video...'}
                      {analysis?.status === 'processing' && 'Analyzing with NVIDIA VSS...'}
                    </p>
                    <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {progress < 20 && 'Uploading video to VSS...'}
                    {progress >= 20 && progress < 50 && 'Generating captions...'}
                    {progress >= 50 && progress < 75 && 'Summarizing events...'}
                    {progress >= 75 && 'Categorizing safety risks...'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
