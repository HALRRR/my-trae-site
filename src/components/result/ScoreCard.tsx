import { Trophy, Target, CheckCircle, XCircle } from 'lucide-react';
import { StarsAnimation } from './StarsAnimation';

interface ScoreCardProps {
  score: number;
  total: number;
  stars: number;
  sceneName: string;
  difficulty: string;
}

export const ScoreCard = ({ score, total, stars, sceneName, difficulty }: ScoreCardProps) => {
  const percentage = Math.round((score / total) * 100);
  const isPassing = percentage >= 60;

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
      <div className="mb-6">
        <Trophy className={`w-16 h-16 mx-auto mb-4 ${
          isPassing ? 'text-amber-500' : 'text-gray-400'
        }`} />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {isPassing ? '恭喜通关!' : '继续加油!'}
        </h2>
        <p className="text-gray-600">
          {sceneName} - {difficulty}
        </p>
      </div>

      <StarsAnimation stars={stars} />

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Target className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-semibold text-gray-600">正确率</span>
          </div>
          <div className="text-3xl font-bold text-indigo-600">
            {percentage}%
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-xl">
          <div className="flex items-center justify-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-semibold text-gray-600">正确</span>
          </div>
          <div className="text-3xl font-bold text-emerald-600">
            {score}/{total}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <CheckCircle className="w-5 h-5 text-emerald-500" />
          <span>正确 {score} 题</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <XCircle className="w-5 h-5 text-rose-500" />
          <span>错误 {total - score} 题</span>
        </div>
      </div>
    </div>
  );
};
