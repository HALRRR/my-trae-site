import { Lock, Star } from 'lucide-react';
import { clsx } from 'clsx';
import type { Scene } from '../../types';

interface SceneCardProps {
  scene: Scene;
  unlocked: boolean;
  stars: number;
  onClick: () => void;
}

export const SceneCard = ({ scene, unlocked, stars, onClick }: SceneCardProps) => {
  return (
    <div
      onClick={unlocked ? onClick : undefined}
      className={clsx(
        'relative bg-white rounded-2xl shadow-lg p-6 transition-all duration-300',
        unlocked && 'hover:shadow-2xl hover:scale-105 cursor-pointer',
        !unlocked && 'opacity-60 cursor-not-allowed'
      )}
    >
      {!unlocked && (
        <div className="absolute inset-0 bg-white/50 rounded-2xl flex items-center justify-center">
          <Lock className="w-12 h-12 text-gray-400" />
        </div>
      )}
      
      <div className="flex flex-col items-center text-center gap-4">
        <div className={clsx(
          'text-6xl transition-transform duration-300',
          unlocked && 'hover:scale-110'
        )}>
          {scene.emoji}
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            {scene.name}
          </h3>
          <p className="text-sm text-gray-600">
            {scene.description}
          </p>
        </div>
        
        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-2 rounded-full">
          <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
          <span className="font-bold text-amber-700">
            {stars} / 9
          </span>
        </div>
        
        <div className="flex gap-1">
          {Array.from({ length: 3 }).map((_, difficultyIndex) => (
            <div key={difficultyIndex} className="flex gap-1">
              {Array.from({ length: 3 }).map((_, starIndex) => (
                <Star
                  key={starIndex}
                  className={clsx(
                    'w-4 h-4 transition-all duration-300',
                    starIndex < [0, 3, 6][difficultyIndex] ? (
                      (difficultyIndex === 0 ? stars >= 1 : 
                       difficultyIndex === 1 ? stars >= 4 : 
                       stars >= 7)
                    ) : false
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-gray-200 text-gray-300'
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
