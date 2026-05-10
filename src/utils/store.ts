import { create } from 'zustand';
import type { GameStore } from '../types';

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: 'idle',
  currentQuestion: 0,
  score: 0,
  selectedAnswer: null,
  isCorrect: null,
  sceneId: null,
  difficulty: null,

  startGame: (sceneId: string, difficulty: 'easy' | 'medium' | 'hard') => {
    set({
      gameState: 'playing',
      currentQuestion: 0,
      score: 0,
      selectedAnswer: null,
      isCorrect: null,
      sceneId,
      difficulty,
    });
  },

  submitAnswer: (answer: number) => {
    set({ selectedAnswer: answer, gameState: 'answering' });
  },

  nextQuestion: () => {
    set({
      currentQuestion: get().currentQuestion + 1,
      selectedAnswer: null,
      isCorrect: null,
      gameState: 'playing',
    });
  },

  completeGame: () => {
    set({ gameState: 'completed' });
  },

  resetGame: () => {
    set({
      gameState: 'idle',
      currentQuestion: 0,
      score: 0,
      selectedAnswer: null,
      isCorrect: null,
      sceneId: null,
      difficulty: null,
    });
  },
}));
