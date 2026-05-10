import { Header } from '../components/layout/Header';
import { SceneCard } from '../components/scene/SceneCard';
import { scenes } from '../data/scenes';
import { useUserProgress } from '../context/UserProgressContext';
import { isSceneUnlocked } from '../utils/storage';
import { Trophy, Star } from 'lucide-react';

export const HomePage = () => {
  const { progress } = useUserProgress();
  const sceneOrder = scenes.map(s => s.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            选择你的冒险场景
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            在不同的场景中学习实用英语,完成挑战获得星星奖励
          </p>
          
          <div className="flex justify-center gap-8">
            <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md">
              <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
              <span className="text-2xl font-bold text-amber-700">{progress.totalStars}</span>
              <span className="text-gray-600">总星星</span>
            </div>
            
            <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md">
              <Trophy className="w-6 h-6 text-indigo-500" />
              <span className="text-2xl font-bold text-indigo-700">{progress.completedScenes.length}</span>
              <span className="text-gray-600">已完成</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scenes.map((scene) => {
            const sceneProgress = progress.sceneProgress[scene.id] || { easy: 0, medium: 0, hard: 0 };
            const totalStars = sceneProgress.easy + sceneProgress.medium + sceneProgress.hard;
            const unlocked = isSceneUnlocked(scene.id, progress, sceneOrder);

            return (
              <SceneCard
                key={scene.id}
                scene={scene}
                unlocked={unlocked}
                stars={totalStars}
                onClick={() => window.location.href = `/scene/${scene.id}`}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
};
