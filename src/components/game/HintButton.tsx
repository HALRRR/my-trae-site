import { Lightbulb, Star } from 'lucide-react';
import { clsx } from 'clsx';

interface HintButtonProps {
  hint: string;
  onClick: () => void;
  cost?: number;
}

export const HintButton = ({ hint, onClick, cost = 1 }: HintButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'group relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300',
        'bg-gradient-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200',
        'text-amber-800 hover:scale-105'
      )}
    >
      <Lightbulb className="w-5 h-5" />
      <span className="font-semibold">提示</span>
      <div className="flex items-center gap-1 ml-1">
        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
        <span className="text-sm font-bold">-{cost}</span>
      </div>
      
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
          {hint}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </div>
      </div>
    </button>
  );
};
