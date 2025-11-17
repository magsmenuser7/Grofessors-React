import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  gradient?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  gradient = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantStyles = {
    primary: gradient
      ? 'bg-gradient-to-r from-[#C8102E] to-[#E02F2F] text-white hover:shadow-lg hover:scale-105'
      : 'bg-[#C8102E] text-white hover:bg-[#A00D25] hover:shadow-md',
    secondary: gradient
      ? 'bg-gradient-to-r from-[#F8C300] to-[#FFD95E] text-[#0D0D0D] hover:shadow-lg hover:scale-105'
      : 'bg-[#F8C300] text-[#0D0D0D] hover:bg-[#E0B100] hover:shadow-md',
    success: gradient
      ? 'bg-gradient-to-r from-[#2A7D46] to-[#6FCF97] text-white hover:shadow-lg hover:scale-105'
      : 'bg-[#2A7D46] text-white hover:bg-[#236838] hover:shadow-md',
    danger:
      'bg-[#E02F2F] text-white hover:bg-[#C02828] hover:shadow-md',
    outline:
      'border-2 border-[#C8102E] text-[#C8102E] hover:bg-[#C8102E] hover:text-white',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
