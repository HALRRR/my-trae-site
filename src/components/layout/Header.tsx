import { Trophy, Star } from 'lucide-react';
import { useUserProgress } from '../../hooks/useUserProgress';

export const Header = () => {
  const { progress } = useUserProgress();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                English Adventure
              </h1>
              <p className="text-sm text-gray-500">Learn English through adventures</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-2 rounded-full">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span className="font-bold text-amber-700">{progress.totalStars}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
