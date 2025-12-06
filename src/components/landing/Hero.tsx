import { Link } from 'react-router-dom';
import { Upload, LayoutDashboard, Shield, Zap } from 'lucide-react';
import ecoLogo from '@/assets/ecovision.png';

export const Hero = () => {
  return (
    <section className="relative gradient-hero text-primary-foreground overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-foreground/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative py-20 lg:py-28">
        <div className="max-w-4xl">
          {/* Logo */}
          <div className="flex items-center gap-4 mb-8 animate-slide-up">
            <img src={ecoLogo} alt="EcoVision" className="h-16 w-auto brightness-0 invert" />
            <span className="text-2xl font-bold">EcoVision</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-slide-up">
            AI-Powered Forest
            <br />
            <span className="text-primary-foreground/90">Safety Monitoring</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl animate-slide-up-delay-1">
            Real-time detection of deforestation, fires, storms, and wildlife using 
            NVIDIA Video Search & Summarization technology. Protect ecosystems with 
            intelligent drone surveillance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12 animate-slide-up-delay-2">
            <Link 
              to="/upload" 
              className="bg-primary-foreground text-secondary hover:bg-primary-foreground/90 font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 inline-flex items-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Analyze Video
            </Link>
            <Link 
              to="/dashboard" 
              className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground font-semibold px-8 py-4 rounded-full border-2 border-primary-foreground/30 transition-all duration-300 hover:shadow-lg inline-flex items-center gap-2"
            >
              <LayoutDashboard className="w-5 h-5" />
              View Dashboard
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-lg animate-slide-up-delay-3">
            <div>
              <div className="flex items-center gap-2 text-primary-foreground/60 mb-1">
                <Zap className="w-4 h-4" />
                <span className="text-sm">Real-time</span>
              </div>
              <p className="text-2xl font-bold">{'<'}2s</p>
              <p className="text-sm text-primary-foreground/60">Detection</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-primary-foreground/60 mb-1">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Accuracy</span>
              </div>
              <p className="text-2xl font-bold">94%</p>
              <p className="text-sm text-primary-foreground/60">Precision</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-primary-foreground/60 mb-1">
                <Upload className="w-4 h-4" />
                <span className="text-sm">Processed</span>
              </div>
              <p className="text-2xl font-bold">10K+</p>
              <p className="text-sm text-primary-foreground/60">Videos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
