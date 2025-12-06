import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { AlertTriangle } from 'lucide-react';
import type { Severity } from '@/types';

interface SeverityChartProps {
  data: Record<Severity, number>;
}

const severityColors: Record<Severity, string> = {
  high: 'hsl(0 84% 60%)',
  medium: 'hsl(45 93% 47%)',
  low: 'hsl(147 96% 26%)',
};

const severityLabels: Record<Severity, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export const SeverityChart = ({ data }: SeverityChartProps) => {
  const chartData = Object.entries(data).map(([severity, value]) => ({
    name: severityLabels[severity as Severity],
    value,
    severity: severity as Severity,
  }));

  return (
    <div className="eco-card">
      <div className="flex items-center gap-2 mb-6">
        <AlertTriangle className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-lg text-foreground">Events by Severity</h3>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={severityColors[entry.severity]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => (
                <span className="text-sm text-muted-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
