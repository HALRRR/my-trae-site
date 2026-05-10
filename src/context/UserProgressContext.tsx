import { createContext, useContext, ReactNode } from 'react';
import { useUserProgress as useUserProgressHook } from '../hooks/useUserProgress';
import type { UserProgress } from '../types';

interface UserProgressContextType {
  progress: UserProgress;
  setProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  updateProgress: (updates: Partial<UserProgress>) => void;
}

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

export const UserProgressProvider = ({ children }: { children: ReactNode }) => {
  const { progress, setProgress, updateProgress } = useUserProgressHook();

  return (
    <UserProgressContext.Provider value={{ progress, setProgress, updateProgress }}>
      {children}
    </UserProgressContext.Provider>
  );
};

export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (!context) {
    throw new Error('useUserProgress must be used within UserProgressProvider');
  }
  return context;
};
