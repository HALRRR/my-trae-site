import { Timer as TimerIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface TimerProps {
  seconds: number;
  totalSeconds?: number;
}

export const Timer = ({ seconds, totalSeconds = 30 }: TimerProps) => {
  const progress = (seconds / totalSeconds) * 100;
  const isLow = seconds <= 10;

  return (
    <div className="flex items-center gap-2">
      <TimerIcon className={clsx(
        'w-5 h-5',
        isLow ? 'text-rose-500 animate-pulse' : 'text-gray-600'
      )} />
      <div className="flex-1">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={clsx(
              'h-full transition-all duration-1000 rounded-full',
              isLow ? 'bg-rose-500' : 'bg-indigo-600'
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <span className={clsx(
        'font-bold min-w-[3rem] text-center',
        isLow ? 'text-rose-500' : 'text-gray-700'
      )}>
        {seconds}s
      </span>
    </div>
  );
};
