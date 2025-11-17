import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  gradient?: 'sunrise' | 'spice-red' | 'gold-glow' | 'green-mist' | 'dashboard-warm';
  hover?: boolean;
}

export function Card({ children, className = '', gradient, hover = false }: CardProps) {
  const gradientClasses = gradient
    ? {
        sunrise: 'bg-gradient-to-br from-[#F8C300] to-[#FFD95E]',
        'spice-red': 'bg-gradient-to-br from-[#C8102E] to-[#E02F2F]',
        'gold-glow': 'bg-gradient-to-br from-[#D6AF37] to-[#FBE9A6]',
        'green-mist': 'bg-gradient-to-br from-[#2A7D46] to-[#6FCF97]',
        'dashboard-warm': 'bg-gradient-to-br from-[#FFFDF2] to-[#FFF4C6]',
      }[gradient]
    : 'bg-white';

  const hoverClass = hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : '';

  return (
    <div
      className={`rounded-lg shadow-md overflow-hidden ${gradientClasses} ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
}
