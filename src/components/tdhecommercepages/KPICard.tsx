import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from './Card';

interface KPICardProps {
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  gradient?: 'sunrise' | 'spice-red' | 'gold-glow' | 'green-mist' | 'dashboard-warm';
  icon?: React.ReactNode;
}

export function KPICard({ label, value, change, trend = 'neutral', gradient, icon }: KPICardProps) {
  const trendIcons = {
    up: <TrendingUp className="w-4 h-4 text-[#2A7D46]" />,
    down: <TrendingDown className="w-4 h-4 text-[#E02F2F]" />,
    neutral: <Minus className="w-4 h-4 text-[#6B7280]" />,
  };

  const trendColors = {
    up: 'text-[#2A7D46]',
    down: 'text-[#E02F2F]',
    neutral: 'text-[#6B7280]',
  };

  return (
    <Card gradient={gradient} className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-[#6B7280] mb-2">{label}</p>
          <p className="text-3xl font-bold text-[#0D0D0D]">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {trendIcons[trend]}
              <span className={`text-sm font-semibold ${trendColors[trend]}`}>
                {change > 0 ? '+' : ''}
                {change}%
              </span>
            </div>
          )}
        </div>
        {icon && <div className="text-[#C8102E] opacity-20">{icon}</div>}
      </div>
    </Card>
  );
}
