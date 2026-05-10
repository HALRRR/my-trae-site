import { Trophy, Target } from 'lucide-react';

interface ScoreDisplayProps {
  current: number;
  total: number;
}

export const ScoreDisplay = ({ current, total }: ScoreDisplayProps) => {
  return (
    <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
      <div className="flex items-center gap-2">
        <Target className="w-5 h-5 text-indigo-600" />
        <span className="font-bold text-gray-800">
          {current} / {total}
        </span>
      </div>
      
      <div className="h-6 w-px bg-gray-300" />
      
      <div className="flex items-center gap-2">
        <Trophy className="w-5 h-5 text-amber-500" />
        <span className="font-bold text-amber-700">
          {Math.round((current / total) * 100)}%
        </span>
      </div>
    </div>
  );
};
