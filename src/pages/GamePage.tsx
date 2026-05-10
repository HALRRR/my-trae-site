import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { scenes } from '../data/scenes';
import { DialogueBox } from '../components/game/DialogueBox';
import { OptionButton } from '../components/game/OptionButton';
import { ScoreDisplay } from '../components/game/ScoreDisplay';
import { Button } from '../components/common/Button';
import { useGameStore } from '../utils/store';
import { useUserProgress } from '../context/UserProgressContext';
import { calculateStars, getNextLevel } from '../utils/gameLogic';
import { ArrowLeft, ChevronRight, Lightbulb } from 'lucide-react';

export const GamePage = () => {
  const { sceneId, difficulty } = useParams<{ sceneId: string; difficulty: string }>();
  const navigate = useNavigate();
  const { progress, setProgress } = useUserProgress();
  const { 
    gameState, 
    currentQuestion, 
    score, 
    selectedAnswer, 
    isCorrect,
    startGame,
    submitAnswer,
    nextQuestion,
    completeGame,
    resetGame
  } = useGameStore();

  const [showHint, setShowHint] = useState(false);
  const [timer, setTimer] = useState(30);

  const scene = scenes.find(s => s.id === sceneId);
  const level = scene?.levels.find(l => l.difficulty === difficulty);

  useEffect(() => {
    if (sceneId && difficulty) {
      startGame(sceneId, difficulty as 'easy' | 'medium' | 'hard');
    }
  }, [sceneId, difficulty, startGame]);

  useEffect(() => {
    if (gameState === 'playing' && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && gameState === 'playing') {
      submitAnswer(-1);
    }
  }, [timer, gameState, submitAnswer]);

  const handleAnswer = useCallback((answerIndex: number) => {
    if (gameState !== 'playing' || !level) return;

    const question = level.questions[currentQuestion];
    const correct = answerIndex === question.correctAnswer;

    if (correct) {
      useGameStore.setState({ score: score + 1 });
    }

    submitAnswer(answerIndex);
    useGameStore.setState({ isCorrect: correct });
  }, [gameState, currentQuestion, score, level, submitAnswer]);

  const handleNext = useCallback(() => {
    if (!level) return;

    if (currentQuestion < level.questions.length - 1) {
      nextQuestion();
      setTimer(30);
      setShowHint(false);
    } else {
      const stars = calculateStars(score, level.questions.length);
      const currentProgress = progress.sceneProgress[sceneId!] || { easy: 0, medium: 0, hard: 0 };
      const maxStars = Math.max(currentProgress[difficulty as keyof typeof currentProgress] || 0, stars);

      setProgress(prev => ({
        ...prev,
        totalStars: prev.totalStars + (maxStars - (currentProgress[difficulty as keyof typeof currentProgress] || 0)),
        sceneProgress: {
          ...prev.sceneProgress,
          [sceneId!]: {
            ...currentProgress,
            [difficulty as keyof typeof currentProgress]: maxStars,
          },
        },
        completedScenes: stars >= 1 && !prev.completedScenes.includes(sceneId!)
          ? [...prev.completedScenes, sceneId!]
          : prev.completedScenes,
      }));

      completeGame();
      navigate(`/result/${sceneId}/${difficulty}/${score}/${level.questions.length}/${stars}`);
    }
  }, [level, currentQuestion, score, difficulty, sceneId, navigate, nextQuestion, completeGame, progress, setProgress]);

  useEffect(() => {
    if (selectedAnswer !== null) {
      const timeout = setTimeout(() => {
        handleNext();
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [selectedAnswer, handleNext]);

  const handleBack = () => {
    resetGame();
    navigate(`/scene/${sceneId}`);
  };

  if (!scene || !level) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">关卡未找到</h2>
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

  const question = level.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <header className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>退出</span>
            </button>
            
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-600">
                {scene.emoji} {scene.name}
              </span>
              <ScoreDisplay current={score} total={level.questions.length} />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>问题 {currentQuestion + 1} / {level.questions.length}</span>
            <div className="flex-1 mx-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
                  style={{ width: `${((currentQuestion + 1) / level.questions.length) * 100}%` }}
                />
              </div>
            </div>
            <span>{timer}s</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <DialogueBox
          npcName={question.npcName}
          npcEmoji={question.npcEmoji}
          dialogue={question.dialogue}
          context={question.context}
        />

        {showHint && (
          <div className="mb-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-amber-800 mb-1">提示</p>
                <p className="text-amber-700">{question.hint}</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <OptionButton
              key={index}
              option={option}
              index={index}
              isSelected={selectedAnswer === index}
              isCorrect={selectedAnswer !== null ? isCorrect : null}
              correctAnswer={question.correctAnswer}
              disabled={selectedAnswer !== null}
              onClick={() => handleAnswer(index)}
            />
          ))}
        </div>

        {selectedAnswer !== null && !isCorrect && (
          <div className="mt-6 p-4 bg-emerald-50 border-2 border-emerald-200 rounded-xl">
            <p className="text-emerald-800 font-semibold mb-2">正确答案:</p>
            <p className="text-emerald-700">{question.options[question.correctAnswer]}</p>
            {question.explanation && (
              <p className="text-emerald-600 text-sm mt-2">{question.explanation}</p>
            )}
          </div>
        )}

        {!showHint && selectedAnswer === null && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowHint(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-full transition-colors"
            >
              <Lightbulb className="w-5 h-5" />
              <span>显示提示 (-1 星星)</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
