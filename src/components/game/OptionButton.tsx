import { CheckCircle, XCircle, Volume2 } from 'lucide-react';
import { clsx } from 'clsx';
import { useSpeech } from '../../hooks/useSpeech';

interface OptionButtonProps {
  option: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean | null;
  correctAnswer: number;
  disabled: boolean;
  onClick: () => void;
}

export const OptionButton = ({
  option,
  index,
  isSelected,
  isCorrect,
  correctAnswer,
  disabled,
  onClick,
}: OptionButtonProps) => {
  const { speak } = useSpeech();
  const letter = String.fromCharCode(65 + index);

  const getStyles = () => {
    if (isCorrect === null) {
      return isSelected
        ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg'
        : 'bg-white text-gray-800 border-gray-300 hover:border-indigo-400 hover:bg-indigo-50';
    }
    
    if (index === correctAnswer) {
      return 'bg-emerald-500 text-white border-emerald-500 shadow-lg';
    }
    
    if (isSelected && index === correctAnswer) {
      return 'bg-emerald-500 text-white border-emerald-500 shadow-lg';
    }
    
    if (isSelected && !isCorrect) {
      return 'bg-rose-500 text-white border-rose-500 shadow-lg animate-shake';
    }
    
    return 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed';
  };

  return (
    <button
      onClick={() => !disabled && onClick()}
      disabled={disabled}
      className={clsx(
        'w-full p-4 rounded-xl border-2 transition-all duration-300 transform text-left',
        'flex items-center gap-4 hover:scale-102',
        disabled && 'cursor-not-allowed',
        getStyles()
      )}
    >
      <div className={clsx(
        'w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0',
        isSelected || (isCorrect !== null && index === correctAnswer)
          ? 'bg-white/30 text-white'
          : 'bg-indigo-100 text-indigo-700'
      )}>
        {letter}
      </div>
      
      <span className="flex-1 text-base">{option}</span>
      
      {isCorrect !== null && index === correctAnswer && (
        <CheckCircle className="w-6 h-6 text-white flex-shrink-0" />
      )}
      
      {isSelected && isCorrect === false && (
        <XCircle className="w-6 h-6 text-white flex-shrink-0" />
      )}
      
      {isCorrect === null && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            speak(option);
          }}
          className="p-1 rounded-full hover:bg-white/20 transition-colors"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      )}
    </button>
  );
};
