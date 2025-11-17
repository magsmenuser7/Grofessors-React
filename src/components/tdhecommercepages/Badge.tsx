import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'primary' | 'muted';
  size?: 'sm' | 'md' | 'lg';
  gradient?: boolean;
}

export function Badge({ children, variant = 'primary', size = 'md', gradient = false }: BadgeProps) {
  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const variantStyles = gradient
    ? {
        success: 'bg-gradient-to-r from-[#2A7D46] to-[#6FCF97] text-white',
        warning: 'bg-gradient-to-r from-[#F4A300] to-[#FFD95E] text-[#0D0D0D]',
        danger: 'bg-gradient-to-r from-[#E02F2F] to-[#FF6B6B] text-white',
        primary: 'bg-gradient-to-r from-[#C8102E] to-[#E02F2F] text-white',
        muted: 'bg-gradient-to-r from-[#6B7280] to-[#9CA3AF] text-white',
      }
    : {
        success: 'bg-[#2A7D46] text-white',
        warning: 'bg-[#F4A300] text-[#0D0D0D]',
        danger: 'bg-[#E02F2F] text-white',
        primary: 'bg-[#C8102E] text-white',
        muted: 'bg-[#6B7280] text-white',
      };

  return (
    <span
      className={`inline-flex items-center justify-center font-semibold rounded-full ${sizeStyles[size]} ${variantStyles[variant]}`}
    >
      {children}
    </span>
  );
}
