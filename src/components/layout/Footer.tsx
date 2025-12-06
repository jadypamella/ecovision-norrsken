import { Link } from 'react-router-dom';
import { Leaf, Linkedin } from 'lucide-react';
import ecoLogo from '@/assets/ecovision.png';

const teamMembers = [
  { name: 'Jady Pamella', linkedin: 'https://www.linkedin.com/in/jadypamella/' },
  { name: 'Supun Chathuranga', linkedin: 'https://www.linkedin.com/in/supun-chathuranga-190372148/' },
  { name: 'Phuwit Vititayanon', linkedin: 'https://www.linkedin.com/in/phuwit-vititayanon-4b6503157/' },
];

export const Footer = () => {
  return (
    <footer className="bg-eco-graphite text-primary-foreground py-12">
      <div className="section-container">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={ecoLogo} alt="EcoVision" className="h-12 w-auto brightness-0 invert" />
              <span className="font-bold text-xl">EcoVision</span>
            </div>
            <p className="text-primary-foreground/70 text-sm max-w-md mb-4">
              AI-powered forest safety monitoring using NVIDIA Video Search & Summarization 
              Blueprint. Protecting forests through intelligent surveillance.
            </p>
            <div className="flex items-center gap-3">
              {teamMembers.map((member, index) => (
                <a 
                  key={index}
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors group"
                  aria-label={`${member.name} LinkedIn`}
                  title={member.name}
                >
                  <Linkedin className="w-5 h-5 group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Leaf className="w-4 h-4 text-primary" />
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/dashboard" className="text-primary-foreground/70 hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/upload" className="text-primary-foreground/70 hover:text-primary transition-colors">
                  Upload Video
                </Link>
              </li>
              <li>
                <Link to="/timeline" className="text-primary-foreground/70 hover:text-primary transition-colors">
                  Event Timeline
                </Link>
              </li>
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h3 className="font-semibold mb-4">Technology</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>NVIDIA VSS Blueprint</li>
              <li>FastAPI Backend</li>
              <li>React Frontend</li>
              <li>Real-time Detection</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-center text-sm text-primary-foreground/50">
          <p>© 2025 SU Heroes' EcoVision Solution | Built for NVIDIA AI Safety Fixathon (Challenge 2)</p>
        </div>
      </div>
    </footer>
  );
};
