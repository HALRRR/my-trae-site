import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export const Card = ({ children, className, onClick, hover = false }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-white rounded-2xl shadow-lg p-6 transition-all duration-300',
        hover && 'cursor-pointer hover:shadow-xl hover:scale-105 transform',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
};
