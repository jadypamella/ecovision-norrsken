import { Layout } from '@/components/layout/Layout';
import { VideoUpload } from '@/components/upload/VideoUpload';
import { Video, Shield, Zap, Eye } from 'lucide-react';

const features = [
  { icon: Zap, text: 'Real-time AI analysis' },
  { icon: Eye, text: 'Multi-event detection' },
  { icon: Shield, text: 'Accurate results' },
];

const Upload = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-background py-12">
        <div className="section-container">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Video className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Upload Drone Video
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              Submit forest monitoring footage for AI-powered safety analysis using 
              NVIDIA Video Search & Summarization technology
            </p>
            
            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-3">
              {features.map(({ icon: Icon, text }) => (
                <span 
                  key={text}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full text-sm text-primary font-medium"
                >
                  <Icon className="w-4 h-4" />
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Upload Component */}
          <VideoUpload />

          {/* Help text */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="eco-card bg-muted/30">
              <h3 className="font-semibold text-foreground mb-3">Tips for best results</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Use stable drone footage with minimal shaking for accurate detection
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Higher resolution videos (1080p or 4K) provide better analysis results
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Daylight footage works best; night vision footage may have reduced accuracy
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Upload;
