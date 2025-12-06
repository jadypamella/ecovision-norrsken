import { Sparkles, Eye, Brain, Clock, Shield } from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'Visual Detection',
    description: 'Flames, smoke, fallen trees, heavy machinery, and wildlife',
  },
  {
    icon: Brain,
    title: 'AI Analysis',
    description: 'Context-aware reasoning and multi-class event classification',
  },
  {
    icon: Clock,
    title: 'Real-Time',
    description: 'Instant video processing with sub-2-second detection latency',
  },
  {
    icon: Shield,
    title: 'Transparent',
    description: 'Visual evidence and explainable AI for every alert',
  },
];

export const VSSTechnology = () => {
  return (
    <section className="py-20 bg-card">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-primary">Powered by NVIDIA</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Video Search & Summarization Blueprint
            </h2>

            <p className="text-muted-foreground mb-8">
              EcoVision leverages NVIDIA&apos;s cutting-edge VSS technology to analyze drone footage 
              with GPU-accelerated Vision Transformers. Our pipeline performs semantic tagging, 
              temporal indexing, and multi-modal reasoning for instant, accurate safety insights.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {features.map(({ icon: Icon, title, description }) => (
                <div 
                  key={title}
                  className="p-4 bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors"
                >
                  <Icon className="w-6 h-6 text-primary mb-2" />
                  <h4 className="font-semibold text-foreground mb-1">{title}</h4>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto">
              {/* Animated rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full rounded-full border border-primary/20 animate-pulse-slow" />
              </div>
              <div className="absolute inset-8 flex items-center justify-center">
                <div className="w-full h-full rounded-full border border-primary/30 animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
              </div>
              <div className="absolute inset-16 flex items-center justify-center">
                <div className="w-full h-full rounded-full border border-primary/40 animate-pulse-slow" style={{ animationDelay: '1s' }} />
              </div>
              
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 gradient-hero rounded-full flex items-center justify-center shadow-eco-glow animate-float">
                  <Brain className="w-16 h-16 text-primary-foreground" />
                </div>
              </div>

              {/* Floating icons */}
              <div className="absolute top-8 right-8 w-12 h-12 bg-fire-bg rounded-xl flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
                <Eye className="w-6 h-6 text-fire" />
              </div>
              <div className="absolute bottom-8 left-8 w-12 h-12 bg-storm-bg rounded-xl flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                <Shield className="w-6 h-6 text-storm" />
              </div>
              <div className="absolute top-1/2 left-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center animate-float" style={{ animationDelay: '1.5s' }}>
                <Clock className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
