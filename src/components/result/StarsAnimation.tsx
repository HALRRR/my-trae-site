import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

interface StarsAnimationProps {
  stars: number;
  delay?: number;
}

export const StarsAnimation = ({ stars, delay = 0 }: StarsAnimationProps) => {
  const [animatedStars, setAnimatedStars] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStars(stars);
    }, delay);
    return () => clearTimeout(timer);
  }, [stars, delay]);

  return (
    <div className="flex gap-4 justify-center my-8">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="relative"
          style={{
            animation: index < animatedStars ? `popIn 0.5s ease-out ${index * 0.3}s forwards` : 'none',
            opacity: index < animatedStars ? 1 : 0.3,
            transform: index < animatedStars ? 'scale(1)' : 'scale(0.8)',
          }}
        >
          <Star
            className={`w-16 h-16 ${
              index < animatedStars
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-300 text-gray-300'
            }`}
          />
        </div>
      ))}
      
      <style>{`
        @keyframes popIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.3);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
