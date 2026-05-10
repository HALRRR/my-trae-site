import type { UserProgress, SceneProgress } from '../types';

const STORAGE_KEY = 'english-game-progress';

const defaultProgress: UserProgress = {
  totalStars: 0,
  completedScenes: [],
  sceneProgress: {},
  achievements: [],
  lastPlayed: new Date().toISOString(),
};

export const loadProgress = (): UserProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading progress:', error);
  }
  return defaultProgress;
};

export const saveProgress = (progress: UserProgress): void => {
  try {
    progress.lastPlayed = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

export const updateSceneProgress = (
  progress: UserProgress,
  sceneId: string,
  difficulty: 'easy' | 'medium' | 'hard',
  stars: number
): UserProgress => {
  const currentProgress = progress.sceneProgress[sceneId] || {
    easy: 0,
    medium: 0,
    hard: 0,
  };
  
  const newStars = Math.max(currentProgress[difficulty], stars);
  
  return {
    ...progress,
    totalStars: progress.totalStars + (newStars - currentProgress[difficulty]),
    sceneProgress: {
      ...progress.sceneProgress,
      [sceneId]: {
        ...currentProgress,
        [difficulty]: newStars,
      },
    },
  };
};

export const unlockNextLevel = (
  progress: UserProgress,
  sceneId: string,
  difficulty: 'easy' | 'medium' | 'hard'
): UserProgress => {
  const difficultyOrder: Array<'easy' | 'medium' | 'hard'> = ['easy', 'medium', 'hard'];
  const currentIndex = difficultyOrder.indexOf(difficulty);
  
  if (currentIndex < difficultyOrder.length - 1) {
    const nextDifficulty = difficultyOrder[currentIndex + 1];
    const currentSceneProgress = progress.sceneProgress[sceneId] || {
      easy: 0,
      medium: 0,
      hard: 0,
    };
    
    return {
      ...progress,
      sceneProgress: {
        ...progress.sceneProgress,
        [sceneId]: currentSceneProgress,
      },
    };
  }
  
  return progress;
};

export const isSceneUnlocked = (
  sceneId: string,
  progress: UserProgress,
  sceneOrder: string[]
): boolean => {
  const sceneIndex = sceneOrder.indexOf(sceneId);
  
  if (sceneIndex === 0) return true;
  
  const previousSceneId = sceneOrder[sceneIndex - 1];
  const previousProgress = progress.sceneProgress[previousSceneId];
  
  if (!previousProgress) return false;
  
  return previousProgress.easy > 0;
};
