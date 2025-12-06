import { Flame, Trees, CloudRain, Rabbit } from 'lucide-react';

const problems = [
  {
    icon: Flame,
    iconColor: 'text-fire',
    bgColor: 'bg-fire-bg',
    title: 'Late Fire Detection',
    description: 'Detect wildfires instantly with flame, smoke, and heat signature analysis before they spread.',
  },
  {
    icon: Trees,
    iconColor: 'text-deforestation',
    bgColor: 'bg-deforestation-bg',
    title: 'Unnoticed Deforestation',
    description: 'Identify illegal clearing and machinery before major damage occurs to protected areas.',
  },
  {
    icon: CloudRain,
    iconColor: 'text-storm',
    bgColor: 'bg-storm-bg',
    title: 'Storm Damage Assessment',
    description: 'Automatically detect fallen trees and unsafe terrain after severe weather events.',
  },
  {
    icon: Rabbit,
    iconColor: 'text-wildlife',
    bgColor: 'bg-wildlife-bg',
    title: 'Wildlife Conflict Zones',
    description: 'Track animal presence to prevent human-wildlife conflicts and protect endangered species.',
  },
];

export const SafetyProblems = () => {
  return (
    <section className="py-20 bg-background">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Safety Problems We Solve
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Proactive detection of environmental threats to protect forests and communities
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {problems.map(({ icon: Icon, iconColor, bgColor, title, description }, index) => (
            <div 
              key={title}
              className="eco-card-hover flex gap-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-6 h-6 ${iconColor}`} />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
