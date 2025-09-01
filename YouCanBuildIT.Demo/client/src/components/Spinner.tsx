import React from 'react';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'medium', 
  color = '#007bff', 
  className = '' 
}) => {
  const sizeClass = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  }[size];

  return (
    <div className={`inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent ${sizeClass} ${className}`} 
         style={{ borderColor: `${color} transparent ${color} ${color}` }}>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;