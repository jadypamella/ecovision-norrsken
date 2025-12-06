import { Video, Cpu, AlertTriangle } from 'lucide-react';

const steps = [
  {
    icon: Video,
    step: '01',
    title: 'Upload Drone Footage',
    description: 'Submit video from forest monitoring flights. Supports MP4, AVI, and MOV formats up to 2GB.',
  },
  {
    icon: Cpu,
    step: '02',
    title: 'AI Analysis with VSS',
    description: 'NVIDIA Video Search & Summarization processes each frame to detect fires, deforestation, storms, and wildlife.',
  },
  {
    icon: AlertTriangle,
    step: '03',
    title: 'Get Safety Alerts',
    description: 'View detected events with timestamps, severity scores, and visual evidence for rapid response.',
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-20 bg-card">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How EcoVision Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to transform drone footage into actionable safety insights
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map(({ icon: Icon, step, title, description }, index) => (
            <div 
              key={step}
              className="relative group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
              )}

              <div className="eco-card text-center group-hover:border-primary/30 h-full">
                {/* Step Number */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                  Step {step}
                </div>

                {/* Icon */}
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-10 h-10 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
                <p className="text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
