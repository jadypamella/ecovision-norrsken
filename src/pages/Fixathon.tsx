import { Layout } from '@/components/layout/Layout';
import { 
  Trophy, 
  Linkedin, 
  Shield, 
  Eye, 
  Users, 
  Target,
  Flame,
  Trees,
  CloudRain,
  Rabbit,
  Video,
  Brain,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Sparkles
} from 'lucide-react';

import jadyPhoto from '@/assets/team/jady.jpg';
import supunPhoto from '@/assets/team/supun.jpg';
import phuwitPhoto from '@/assets/team/phuwit.jpg';

const teamMembers = [
  {
    name: 'Jady Pamella',
    linkedin: 'https://www.linkedin.com/in/jadypamella/',
    tagline: 'AI, Cybersecurity & IT Consultant',
    photo: jadyPhoto
  },
  {
    name: 'Supun Chathuranga',
    linkedin: 'https://www.linkedin.com/in/supun-chathuranga-190372148/',
    tagline: 'AI Engineer',
    photo: supunPhoto
  },
  {
    name: 'Phuwit Vititayanon',
    linkedin: 'https://www.linkedin.com/in/phuwit-vititayanon-4b6503157/',
    tagline: 'AI maker, Data Scientist',
    photo: phuwitPhoto
  }
];

const safetyProblems = [
  {
    icon: Flame,
    title: 'Early Fire Detection',
    description: 'Detect wildfires instantly with flame, smoke, and heat signature analysis before they spread.',
    color: 'text-fire'
  },
  {
    icon: Trees,
    title: 'Late Detection of Deforestation',
    description: 'Forest destruction often happens far from human presence. EcoVision highlights new clearings, exposed soil and machinery instantly.',
    color: 'text-deforestation'
  },
  {
    icon: CloudRain,
    title: 'Storm Damage Assessment',
    description: 'Storms create fallen trees, blocked paths and unstable terrain. EcoVision identifies impact zones automatically.',
    color: 'text-storm'
  },
  {
    icon: Rabbit,
    title: 'Wildlife Conflict Zones',
    description: 'Track animal presence and movement patterns, allowing safer navigation and early warnings for potential conflict zones.',
    color: 'text-wildlife'
  },
  {
    icon: Eye,
    title: 'Lack of Transparency',
    description: 'EcoVision attaches visual evidence to every detected event, making monitoring transparent and auditable.',
    color: 'text-primary'
  },
  {
    icon: Brain,
    title: 'Human Dependence for Video Reviews',
    description: 'Reviewing hours of drone footage is tiring and error prone. EcoVision replaces manual scanning with AI assisted search.',
    color: 'text-primary'
  }
];

const aiSafetyPrinciples = [
  {
    title: 'Transparency',
    source: 'OECD AI Principles',
    description: 'EcoVision shows clips, detected objects and explanations for each event, giving full visibility into how conclusions were reached.'
  },
  {
    title: 'Human Oversight',
    source: 'EU AI Act',
    description: 'Operators remain responsible for decisions. EcoVision highlights events but does not act autonomously.'
  },
  {
    title: 'Robustness and Physical Safety',
    source: 'NIST AI RMF',
    description: 'Early detection of fires, storm damage, illegal clearing and wildlife pressure helps prevent accidents for field teams and communities.'
  },
  {
    title: 'Fairness and Bias Reduction',
    source: 'OECD AI Principles',
    description: 'Consistent video processing reduces differences caused by manual patrols or human judgment.'
  }
];

const Fixathon = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-eco-deep-green via-eco-forest-mist to-eco-leaf-green text-primary-foreground py-16">
          <div className="section-container">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-8 h-8 text-yellow-400" />
              <span className="text-lg font-medium text-primary-foreground/90">NVIDIA AI Safety Fixathon</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Challenge 2: AI Safety in Physical Environments
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mb-6">
              How do we build Physical AI systems that don't just operate powerfully in the real world — 
              but do so safely, transparently, and in alignment with human intentions?
            </p>
            <a 
              href="https://www.norrsken.org/fixathon-focus-areas/ai-safety" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 px-6 py-3 rounded-full transition-all"
            >
              <ExternalLink className="w-5 h-5" />
              View Challenge Details
            </a>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-card">
          <div className="section-container">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Users className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">Our Team</h2>
              </div>
              <p className="text-muted-foreground">The minds behind EcoVision</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {teamMembers.map((member, index) => (
                <a
                  key={index}
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eco-card group hover:border-primary/50 text-center"
                >
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-4 border-primary/20 group-hover:border-primary/50 group-hover:scale-110 transition-all">
                    <img 
                      src={member.photo} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{member.tagline}</p>
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <Linkedin className="w-5 h-5" />
                    <span className="text-sm font-medium">Connect on LinkedIn</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="py-16 bg-background">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">Problem Statement</h2>
              </div>
              <div className="eco-card bg-gradient-to-r from-primary/5 to-eco-forest-mist/10 border-primary/20">
                <p className="text-lg text-foreground leading-relaxed">
                  Forests face fast and often unnoticed environmental risks such as <strong className="text-fire">wildfires</strong>, <strong className="text-deforestation">deforestation</strong>, <strong className="text-storm">storm damage</strong> and <strong className="text-wildlife">wildlife pressure</strong>. 
                  Human review of drone footage is slow and incomplete, which delays important actions. 
                  <span className="text-primary font-semibold"> EcoVision uses NVIDIA VSS to transform raw drone video into immediate safety signals</span> that help protect forests with speed and transparency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Problems Solved */}
        <section className="py-16 bg-card">
          <div className="section-container">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">AI Physical Safety Problems We Solve</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {safetyProblems.map((problem, index) => {
                const Icon = problem.icon;
                return (
                  <div key={index} className="eco-card group">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-current/10 ${problem.color}`}>
                      <Icon className={`w-6 h-6 ${problem.color}`} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{problem.title}</h3>
                    <p className="text-muted-foreground text-sm">{problem.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* MVP Scope */}
        <section className="py-16 bg-background">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Video className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">MVP Scope</h2>
              </div>
              <div className="eco-card">
                <p className="text-foreground mb-6">
                  EcoVision delivers a Vision AI Agent built on the NVIDIA VSS blueprint that detects and summarizes forest safety events from drone video. The MVP identifies:
                </p>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-fire/10 rounded-lg">
                    <Flame className="w-5 h-5 text-fire" />
                    <span className="font-medium text-foreground">Fire Detection</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-deforestation/10 rounded-lg">
                    <Trees className="w-5 h-5 text-deforestation" />
                    <span className="font-medium text-foreground">Deforestation</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-storm/10 rounded-lg">
                    <CloudRain className="w-5 h-5 text-storm" />
                    <span className="font-medium text-foreground">Storm Impact</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-wildlife/10 rounded-lg">
                    <Rabbit className="w-5 h-5 text-wildlife" />
                    <span className="font-medium text-foreground">Wildlife Activity</span>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  It converts these detections into searchable clips and structured records. A Lovable UI allows users to explore events, search by category and view safety summaries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Safety Principles */}
        <section className="py-16 bg-card">
          <div className="section-container">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">AI Safety Principles Addressed</h2>
              </div>
              <p className="text-muted-foreground">EcoVision fully applies AI Safety principles from official frameworks</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {aiSafetyPrinciples.map((principle, index) => (
                <div key={index} className="eco-card border-l-4 border-l-primary">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-1">{principle.title}</h3>
                      <p className="text-xs text-primary font-medium mb-2">Source: {principle.source}</p>
                      <p className="text-muted-foreground text-sm">{principle.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Official sources: 
                <a href="https://oecd.ai/en/ai-principles" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-2">OECD AI Principles</a> | 
                <a href="https://artificialintelligenceact.eu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-2">EU AI Act</a> | 
                <a href="https://www.nist.gov/itl/ai-risk-management-framework" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-2">NIST AI RMF</a>
              </p>
            </div>
          </div>
        </section>

        {/* Architecture Flow */}
        <section className="py-16 bg-background">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Brain className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">System Architecture</h2>
              </div>
              <div className="eco-card bg-eco-graphite text-primary-foreground">
                <div className="flex flex-wrap items-center justify-center gap-4 text-center">
                  <div className="p-4 bg-primary-foreground/10 rounded-xl">
                    <Video className="w-8 h-8 mx-auto mb-2" />
                    <span className="text-sm font-medium">Drone Video</span>
                  </div>
                  <AlertTriangle className="w-6 h-6 text-primary-foreground/50 rotate-90" />
                  <div className="p-4 bg-primary-foreground/10 rounded-xl">
                    <Sparkles className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <span className="text-sm font-medium">VSS Blueprint</span>
                  </div>
                  <AlertTriangle className="w-6 h-6 text-primary-foreground/50 rotate-90" />
                  <div className="p-4 bg-primary-foreground/10 rounded-xl">
                    <Brain className="w-8 h-8 mx-auto mb-2" />
                    <span className="text-sm font-medium">Safety Engine</span>
                  </div>
                  <AlertTriangle className="w-6 h-6 text-primary-foreground/50 rotate-90" />
                  <div className="p-4 bg-primary-foreground/10 rounded-xl">
                    <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <span className="text-sm font-medium">Event API</span>
                  </div>
                  <AlertTriangle className="w-6 h-6 text-primary-foreground/50 rotate-90" />
                  <div className="p-4 bg-primary-foreground/10 rounded-xl">
                    <Eye className="w-8 h-8 mx-auto mb-2" />
                    <span className="text-sm font-medium">Lovable UI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenge Prize */}
        <section className="py-16 bg-gradient-to-br from-primary via-eco-forest-mist to-eco-deep-green text-primary-foreground">
          <div className="section-container text-center">
            <Trophy className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
            <h2 className="text-3xl font-bold mb-4">Challenge Prize</h2>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              The winning team of the AI Safety track "AI Safety in real-world physical environments" 
              will be invited to <strong>Advania and NVIDIA</strong> to present their solution.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Fixathon;
