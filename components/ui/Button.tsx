
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', ...props }) => {
  const baseStyles = 'font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-in-out transform hover:scale-105';

  const sizeStyles = {
    md: 'px-4 py-2 text-sm',
    lg: 'px-8 py-3 text-base',
  };

  const variantStyles = {
    primary: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500',
    secondary: 'bg-slate-200 text-slate-800 hover:bg-slate-300 focus:ring-slate-400',
  };

  const className = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${props.className || ''}`;

  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
};

export default Button;
