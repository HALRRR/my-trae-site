import { Star } from 'lucide-react';

interface StarsDisplayProps {
  stars: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export const StarsDisplay = ({ 
  stars, 
  maxStars = 3, 
  size = 'md',
  animated = false 
}: StarsDisplayProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: maxStars }).map((_, index) => (
        <Star
          key={index}
          className={clsx(
            sizeClasses[size],
            'transition-all duration-300',
            index < stars
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-gray-200 text-gray-300',
            animated && index < stars && 'animate-bounce'
          )}
          style={animated ? { animationDelay: `${index * 200}ms` } : undefined}
        />
      ))}
    </div>
  );
};

import { clsx } from 'clsx';
