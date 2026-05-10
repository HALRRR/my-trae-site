export const calculateStars = (score: number, total: number): number => {
  const percentage = (score / total) * 100;
  if (percentage >= 90) return 3;
  if (percentage >= 80) return 2;
  if (percentage >= 60) return 1;
  return 0;
};

export const checkAchievements = (
  progress: {
    totalStars: number;
    completedScenes: string[];
    sceneProgress: Record<string, any>;
  }
): string[] => {
  const newAchievements: string[] = [];
  
  if (progress.completedScenes.length > 0) {
    newAchievements.push('first-win');
  }
  
  if (progress.totalStars >= 15) {
    newAchievements.push('all-stars');
  }
  
  if (progress.completedScenes.length >= 5) {
    newAchievements.push('scene-master');
  }
  
  Object.values(progress.sceneProgress).forEach((scene: any) => {
    if (scene.easy === 3 || scene.medium === 3 || scene.hard === 3) {
      if (!newAchievements.includes('perfect-score')) {
        newAchievements.push('perfect-score');
      }
    }
  });
  
  return newAchievements;
};

export const getNextLevel = (
  sceneId: string,
  difficulty: 'easy' | 'medium' | 'hard'
): { sceneId: string; difficulty: 'easy' | 'medium' | 'hard' } | null => {
  const difficultyOrder: Array<'easy' | 'medium' | 'hard'> = ['easy', 'medium', 'hard'];
  const currentIndex = difficultyOrder.indexOf(difficulty);
  
  if (currentIndex < difficultyOrder.length - 1) {
    return {
      sceneId,
      difficulty: difficultyOrder[currentIndex + 1],
    };
  }
  
  return null;
};
