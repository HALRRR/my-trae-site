import { useState, useEffect } from 'react';
import type { UserProgress } from '../types';
import { loadProgress, saveProgress } from '../utils/storage';

export const useUserProgress = () => {
  const [progress, setProgress] = useState<UserProgress>(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const updateProgress = (updates: Partial<UserProgress>) => {
    setProgress(prev => ({ ...prev, ...updates }));
  };

  return {
    progress,
    setProgress,
    updateProgress,
  };
};
