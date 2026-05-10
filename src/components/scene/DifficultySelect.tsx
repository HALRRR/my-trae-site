import { CheckCircle, Lock, Play } from 'lucide-react';
import { clsx } from 'clsx';
import { Button } from '../common/Button';
import { StarsDisplay } from '../common/StarsDisplay';
import type { Level } from '../../types';

interface DifficultySelectProps {
  levels: Level[];
  onSelect: (difficulty: 'easy' | 'medium' | 'hard') => void;
  onBack: () => void;
}

export const DifficultySelect = ({ levels, onSelect, onBack }: DifficultySelectProps) => {
  const difficultyColors = {
    easy: {
      bg: 'bg-emerald-50 border-emerald-200',
      text: 'text-emerald-700',
      badge: 'bg-emerald-100 text-emerald-700',
    },
    medium: {
      bg: 'bg-amber-50 border-amber-200',
      text: 'text-amber-700',
      badge: 'bg-amber-100 text-amber-700',
    },
    hard: {
      bg: 'bg-rose-50 border-rose-200',
      text: 'text-rose-700',
      badge: 'bg-rose-100 text-rose-700',
    },
  };

  const difficultyLabels = {
    easy: '初级',
    medium: '中级',
    hard: '高级',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800">选择难度</h2>
        <Button variant="ghost" onClick={onBack}>
          ← 返回
        </Button>
      </div>

      <div className="grid gap-4">
        {levels.map((level) => {
          const colors = difficultyColors[level.difficulty];
          const isUnlocked = level.unlocked;
          
          return (
            <div
              key={level.difficulty}
              className={clsx(
                'rounded-xl border-2 p-6 transition-all duration-300',
                colors.bg,
                isUnlocked && 'hover:shadow-lg cursor-pointer',
                !isUnlocked && 'opacity-60'
              )}
              onClick={() => isUnlocked && onSelect(level.difficulty)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={clsx('p-3 rounded-lg bg-white', colors.badge)}>
                    {isUnlocked ? (
                      <Play className="w-6 h-6" />
                    ) : (
                      <Lock className="w-6 h-6" />
                    )}
                  </div>
                  
                  <div>
                    <h3 className={clsx('text-xl font-bold', colors.text)}>
                      {difficultyLabels[level.difficulty]}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {level.questions.length} 道题目
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <StarsDisplay stars={level.stars} size="lg" />
                  {level.stars > 0 && (
                    <CheckCircle className="w-6 h-6 text-emerald-500" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
