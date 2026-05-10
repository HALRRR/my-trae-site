import { useParams, useNavigate } from 'react-router-dom';
import { scenes } from '../data/scenes';
import { DifficultySelect } from '../components/scene/DifficultySelect';
import { useUserProgress } from '../context/UserProgressContext';
import { Header } from '../components/layout/Header';
import { ArrowLeft } from 'lucide-react';

export const ScenePage = () => {
  const { sceneId } = useParams<{ sceneId: string }>();
  const navigate = useNavigate();
  const { progress } = useUserProgress();

  const scene = scenes.find(s => s.id === sceneId);

  if (!scene) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">场景未找到</h2>
          <button
            onClick={() => navigate('/')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const handleSelectDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
    navigate(`/game/${sceneId}/${difficulty}`);
  };

  const handleBack = () => {
    navigate('/');
  };

  const updatedLevels = scene.levels.map((level, index) => {
    const sceneProgress = progress.sceneProgress[sceneId!] || { easy: 0, medium: 0, hard: 0 };
    
    let unlocked = true;
    if (index === 1) {
      unlocked = sceneProgress.easy > 0;
    } else if (index === 2) {
      unlocked = sceneProgress.medium > 0;
    }

    return {
      ...level,
      unlocked,
      stars: sceneProgress[level.difficulty] || 0,
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回</span>
        </button>

        <div className="text-center mb-12">
          <div className="text-8xl mb-6">{scene.emoji}</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{scene.name}</h1>
          <p className="text-lg text-gray-600">{scene.description}</p>
        </div>

        <DifficultySelect
          levels={updatedLevels}
          onSelect={handleSelectDifficulty}
          onBack={handleBack}
        />
      </main>
    </div>
  );
};
