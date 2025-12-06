import { Video, Cpu, Eye, Brain, AlertTriangle, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Video,
    title: 'Video Ingestion',
    description: 'Drone footage is uploaded and preprocessed for analysis',
  },
  {
    icon: Eye,
    title: 'Feature Extraction',
    description: 'GPU-accelerated Vision Transformers extract visual features',
  },
  {
    icon: Brain,
    title: 'AI Analysis',
    description: 'Context-aware reasoning classifies events and threats',
  },
  {
    icon: AlertTriangle,
    title: 'Alert Generation',
    description: 'Safety events are scored and alerts are dispatched',
  },
];

export const VSSPipeline = () => {
  return (
    <div className="eco-card">
      <div className="flex items-center gap-2 mb-6">
        <Cpu className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-lg text-foreground">NVIDIA VSS Processing Pipeline</h3>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, index) => (
          <div key={step.title} className="relative">
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-muted/50 hover:bg-primary/5 transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-sm text-foreground mb-1">{step.title}</h4>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </div>
            
            {index < steps.length - 1 && (
              <div className="hidden lg:flex absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                <ArrowRight className="w-4 h-4 text-primary/50" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
