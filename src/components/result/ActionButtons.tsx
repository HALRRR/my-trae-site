import { RotateCcw, Home, ChevronRight } from 'lucide-react';
import { Button } from '../common/Button';

interface ActionButtonsProps {
  onRetry: () => void;
  onNext: () => void;
  onHome: () => void;
  showNext: boolean;
}

export const ActionButtons = ({ onRetry, onNext, onHome, showNext }: ActionButtonsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Button
        variant="secondary"
        onClick={onRetry}
        className="flex items-center gap-2"
      >
        <RotateCcw className="w-5 h-5" />
        再试一次
      </Button>

      {showNext && (
        <Button
          variant="primary"
          onClick={onNext}
          className="flex items-center gap-2"
        >
          下一关
          <ChevronRight className="w-5 h-5" />
        </Button>
      )}

      <Button
        variant="ghost"
        onClick={onHome}
        className="flex items-center gap-2"
      >
        <Home className="w-5 h-5" />
        返回首页
      </Button>
    </div>
  );
};
