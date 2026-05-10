export interface Question {
  id: string;
  npcName: string;
  npcEmoji: string;
  dialogue: string;
  context: string;
  options: string[];
  correctAnswer: number;
  hint?: string;
  explanation?: string;
}

export interface Level {
  difficulty: 'easy' | 'medium' | 'hard';
  difficultyLabel: string;
  questions: Question[];
  unlocked: boolean;
  stars: number;
}

export interface Scene {
  id: string;
  name: string;
  emoji: string;
  description: string;
  backgroundColor: string;
  levels: Level[];
}

export interface SceneProgress {
  easy: number;
  medium: number;
  hard: number;
}

export interface UserProgress {
  totalStars: number;
  completedScenes: string[];
  sceneProgress: Record<string, SceneProgress>;
  achievements: string[];
  lastPlayed: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  unlocked: boolean;
}

export type GameState = 'idle' | 'playing' | 'answering' | 'feedback' | 'completed';

export interface GameStore {
  gameState: GameState;
  currentQuestion: number;
  score: number;
  selectedAnswer: number | null;
  isCorrect: boolean | null;
  sceneId: string | null;
  difficulty: 'easy' | 'medium' | 'hard' | null;
  
  startGame: (sceneId: string, difficulty: 'easy' | 'medium' | 'hard') => void;
  submitAnswer: (answer: number) => void;
  nextQuestion: () => void;
  completeGame: () => void;
  resetGame: () => void;
}
