import { Volume2 } from 'lucide-react';
import { useSpeech } from '../../hooks/useSpeech';
import { clsx } from 'clsx';

interface DialogueBoxProps {
  npcName: string;
  npcEmoji: string;
  dialogue: string;
  context: string;
}

export const DialogueBox = ({ npcName, npcEmoji, dialogue, context }: DialogueBoxProps) => {
  const { speak } = useSpeech();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex items-start gap-4">
        <div className="text-5xl flex-shrink-0">{npcEmoji}</div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg text-gray-800">{npcName}</h3>
            <button
              onClick={() => speak(dialogue)}
              className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors"
              title="Listen to dialogue"
            >
              <Volume2 className="w-5 h-5 text-indigo-600" />
            </button>
          </div>
          
          <p className="text-gray-700 text-lg leading-relaxed mb-3">
            "{dialogue}"
          </p>
          
          <p className="text-sm text-gray-500 italic">
            {context}
          </p>
        </div>
      </div>
    </div>
  );
};
