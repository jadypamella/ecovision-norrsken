import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BarChart3 } from 'lucide-react';
import type { EventType } from '@/types';

interface EventChartProps {
  data: Record<EventType, number>;
}

const eventColors: Record<EventType, string> = {
  fire: 'hsl(24 95% 53%)',
  deforestation: 'hsl(0 72% 51%)',
  storm: 'hsl(217 91% 60%)',
  wildlife: 'hsl(45 93% 47%)',
};

const eventLabels: Record<EventType, string> = {
  fire: 'Fire',
  deforestation: 'Deforestation',
  storm: 'Storm',
  wildlife: 'Wildlife',
};

export const EventChart = ({ data }: EventChartProps) => {
  const chartData = Object.entries(data).map(([type, value]) => ({
    name: eventLabels[type as EventType],
    value,
    type: type as EventType,
  }));

  return (
    <div className="eco-card">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-lg text-foreground">Events by Type</h3>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
            <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis 
              dataKey="name" 
              type="category" 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12}
              width={90}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={eventColors[entry.type]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
