import { useEffect } from 'react';

export const useConfetti = (trigger: boolean) => {
  useEffect(() => {
    if (trigger) {
      const colors = ['#4F46E5', '#F97316', '#10B981', '#EF4444', '#8B5CF6'];
      
      for (let i = 0; i < 50; i++) {
        setTimeout(() => {
          const confetti = document.createElement('div');
          confetti.style.position = 'fixed';
          confetti.style.left = Math.random() * 100 + 'vw';
          confetti.style.top = '-10px';
          confetti.style.width = '10px';
          confetti.style.height = '10px';
          confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          confetti.style.borderRadius = '50%';
          confetti.style.pointerEvents = 'none';
          confetti.style.zIndex = '9999';
          confetti.style.animation = `fall ${2 + Math.random() * 2}s linear forwards`;
          
          document.body.appendChild(confetti);
          
          setTimeout(() => {
            confetti.remove();
          }, 4000);
        }, i * 30);
      }
    }
  }, [trigger]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fall {
        to {
          transform: translateY(100vh) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);
};
