import { Link } from 'react-router-dom';
import { Upload, ArrowRight } from 'lucide-react';

export const CTA = () => {
  return (
    <section className="py-20 gradient-hero relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary-foreground rounded-full blur-3xl" />
      </div>

      <div className="section-container relative text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
          Start Monitoring Today
        </h2>
        <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
          Upload your first drone video and experience the power of AI-driven 
          forest safety monitoring in minutes.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link 
            to="/upload" 
            className="bg-primary-foreground text-secondary hover:bg-primary-foreground/90 font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 inline-flex items-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Upload Video Now
          </Link>
          <Link 
            to="/dashboard" 
            className="text-primary-foreground font-semibold px-8 py-4 hover:underline inline-flex items-center gap-2 group"
          >
            Explore Dashboard
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
