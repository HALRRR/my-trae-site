import { useParams, useNavigate } from 'react-router-dom';
import { ScoreCard } from '../components/result/ScoreCard';
import { ActionButtons } from '../components/result/ActionButtons';
import { scenes } from '../data/scenes';
import { useConfetti } from '../hooks/useConfetti';
import { getNextLevel } from '../utils/gameLogic';

export const ResultPage = () => {
  const { sceneId, difficulty, score, total, stars } = useParams<{
    sceneId: string;
    difficulty: string;
    score: string;
    total: string;
    stars: string;
  }>();
  const navigate = useNavigate();

  const scene = scenes.find(s => s.id === sceneId);
  const scoreNum = parseInt(score || '0');
  const totalNum = parseInt(total || '0');
  const starsNum = parseInt(stars || '0');
  const difficultyLabel = {
    easy: '初级',
    medium: '中级',
    hard: '高级',
  }[difficulty || 'easy'];

  const showConfetti = starsNum >= 2;
  useConfetti(showConfetti);

  const handleRetry = () => {
    navigate(`/game/${sceneId}/${difficulty}`);
  };

  const handleNext = () => {
    const nextLevel = getNextLevel(sceneId!, difficulty as 'easy' | 'medium' | 'hard');
    if (nextLevel) {
      navigate(`/game/${nextLevel.sceneId}/${nextLevel.difficulty}`);
    } else {
      navigate(`/scene/${sceneId}`);
    }
  };

  const handleHome = () => {
    navigate('/');
  };

  const showNextButton = starsNum >= 2 && getNextLevel(sceneId!, difficulty as 'easy' | 'medium' | 'hard') !== null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <ScoreCard
          score={scoreNum}
          total={totalNum}
          stars={starsNum}
          sceneName={scene?.name || ''}
          difficulty={difficultyLabel}
        />

        <div className="mt-8">
          <ActionButtons
            onRetry={handleRetry}
            onNext={handleNext}
            onHome={handleHome}
            showNext={showNextButton}
          />
        </div>

        {showConfetti && (
          <div className="text-center mt-8">
            <p className="text-lg font-semibold text-indigo-600 animate-bounce">
              🎉 太棒了! 🎉
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
