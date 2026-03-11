import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, Badge, ALL_BADGES, COMPANIES } from '@/types';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (fullName: string, email: string, password: string, goal: User['goal']) => boolean;
  logout: () => void;
  addXP: (amount: number) => void;
  completeTask: (taskId: string) => void;
  saveQuizScore: (topicId: number, score: number) => void;
  saveExamScore: (topicId: number, score: number, total: number, wrongQuestions: number[]) => void;
  completeTopic: (topicId: number) => void;
  markSubtopicRead: (subtopicId: string) => void;
  readSubtopics: string[];
  isTopicUnlocked: (topicId: number) => boolean;
  isExamUnlocked: (topicId: number) => boolean;
  completeDailyChallenge: (challengeId: string) => void;
  completeRemediation: (key: string) => void;
  setWeakTopics: (topicId: number, subtopics: string[]) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

const STORAGE_KEY = 'devpath_user';
const READ_SUBTOPICS_KEY = 'devpath_read_subtopics';

function loadUser(): User | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch { return null; }
}

function saveUser(user: User) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

function loadReadSubtopics(): string[] {
  try {
    const data = localStorage.getItem(READ_SUBTOPICS_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}

function checkStreak(user: User): User {
  const today = new Date().toDateString();
  const lastVisit = user.lastVisit ? new Date(user.lastVisit).toDateString() : '';
  
  if (lastVisit === today) return user;
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (lastVisit === yesterday.toDateString()) {
    const newStreak = user.streak + 1;
    return {
      ...user,
      streak: newStreak,
      longestStreak: Math.max(newStreak, user.longestStreak),
      lastVisit: new Date().toISOString(),
    };
  }
  
  return { ...user, streak: 1, lastVisit: new Date().toISOString() };
}

function checkBadges(user: User): User {
  const earned = [...user.badges];
  const earnBadge = (id: string) => {
    if (!earned.find(b => b.id === id)) {
      const badge = ALL_BADGES.find(b => b.id === id);
      if (badge) earned.push({ ...badge, earnedAt: new Date().toISOString() });
    }
  };

  if (user.completedTasks.length >= 1) earnBadge('first-step');
  if (user.streak >= 7) earnBadge('streak-7');
  if (user.streak >= 30) earnBadge('streak-30');
  if (user.completedTopics.includes(2)) earnBadge('html-hero');
  if (user.completedTopics.includes(3)) earnBadge('css-champion');
  if (user.completedTopics.includes(4)) earnBadge('js-warrior');
  if (user.completedTopics.includes(6)) earnBadge('react-ranger');
  if (user.completedTopics.includes(8)) earnBadge('git-guardian');
  if (user.completedTopics.includes(10)) earnBadge('backend-builder');
  if (user.completedTopics.includes(11) && user.completedTopics.includes(12)) earnBadge('database-duke');
  if (user.completedTopics.length >= 15) earnBadge('fullstack-fighter');
  
  for (const [, score] of Object.entries(user.quizScores)) {
    if (score === 10) { earnBadge('quiz-master'); break; }
  }
  for (const [, score] of Object.entries(user.examScores)) {
    if (score === 15) { earnBadge('perfect-exam'); break; }
  }

  return { ...user, badges: earned };
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(loadUser);
  const [readSubtopics, setReadSubtopics] = useState<string[]>(loadReadSubtopics);

  useEffect(() => {
    if (user) {
      const updated = checkStreak(checkBadges(user));
      if (JSON.stringify(updated) !== JSON.stringify(user)) {
        setUser(updated);
      }
      saveUser(updated);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(READ_SUBTOPICS_KEY, JSON.stringify(readSubtopics));
  }, [readSubtopics]);

  const login = useCallback((email: string, password: string): boolean => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return false;
    const u: User = JSON.parse(stored);
    if (u.email === email && u.password === password) {
      setUser(checkStreak(u));
      return true;
    }
    return false;
  }, []);

  const signup = useCallback((fullName: string, email: string, password: string, goal: User['goal']): boolean => {
    const newUser: User = {
      id: crypto.randomUUID(),
      fullName, email, password, goal,
      company: COMPANIES[Math.floor(Math.random() * COMPANIES.length)],
      xp: 0, streak: 1, longestStreak: 1,
      lastVisit: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      completedTopics: [], completedTasks: [],
      quizScores: {}, examScores: {}, examAttempts: {},
      badges: [], weakTopics: {}, remediationComplete: {},
      dailyChallengesCompleted: [],
      companyTasksCompleted: 0,
      tasksSinceCompanyRotation: 0,
    };
    setUser(newUser);
    saveUser(newUser);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const addXP = useCallback((amount: number) => {
    setUser(prev => prev ? { ...prev, xp: prev.xp + amount } : null);
  }, []);

  const completeTask = useCallback((taskId: string) => {
    setUser(prev => {
      if (!prev || prev.completedTasks.includes(taskId)) return prev;
      const tasksCompleted = prev.tasksSinceCompanyRotation + 1;
      let company = prev.company;
      let rotation = tasksCompleted;
      if (tasksCompleted >= 5) {
        const currentIdx = COMPANIES.indexOf(company as typeof COMPANIES[number]);
        company = COMPANIES[(currentIdx + 1) % COMPANIES.length];
        rotation = 0;
      }
      return {
        ...prev,
        completedTasks: [...prev.completedTasks, taskId],
        xp: prev.xp + 50,
        companyTasksCompleted: prev.companyTasksCompleted + 1,
        tasksSinceCompanyRotation: rotation,
        company,
      };
    });
  }, []);

  const saveQuizScore = useCallback((topicId: number, score: number) => {
    setUser(prev => {
      if (!prev) return null;
      const bonusXP = score === 10 ? 50 : 0;
      return {
        ...prev,
        quizScores: { ...prev.quizScores, [topicId]: Math.max(prev.quizScores[topicId] || 0, score) },
        xp: prev.xp + (score * 10) + bonusXP,
      };
    });
  }, []);

  const saveExamScore = useCallback((topicId: number, score: number, total: number, wrongQuestions: number[]) => {
    setUser(prev => {
      if (!prev) return null;
      const attempt = { score, total, date: new Date().toISOString(), wrongQuestions };
      const attempts = [...(prev.examAttempts[topicId] || []), attempt];
      return {
        ...prev,
        examScores: { ...prev.examScores, [topicId]: Math.max(prev.examScores[topicId] || 0, score) },
        examAttempts: { ...prev.examAttempts, [topicId]: attempts },
        xp: prev.xp + (score >= Math.ceil(total * 0.7) ? 100 : 0),
      };
    });
  }, []);

  const completeTopic = useCallback((topicId: number) => {
    setUser(prev => {
      if (!prev || prev.completedTopics.includes(topicId)) return prev;
      return {
        ...prev,
        completedTopics: [...prev.completedTopics, topicId],
        xp: prev.xp + 200,
      };
    });
  }, []);

  const markSubtopicRead = useCallback((subtopicId: string) => {
    setReadSubtopics(prev => {
      if (prev.includes(subtopicId)) return prev;
      return [...prev, subtopicId];
    });
    addXP(5);
  }, [addXP]);

  const isTopicUnlocked = useCallback((topicId: number): boolean => {
    if (topicId === 1) return true;
    return user?.completedTopics.includes(topicId - 1) ?? false;
  }, [user]);

  const isExamUnlocked = useCallback((topicId: number): boolean => {
    if (!user) return false;
    const topicTasks = [`TASK-${String((topicId - 1) * 3 + 1).padStart(3, '0')}`, `TASK-${String((topicId - 1) * 3 + 2).padStart(3, '0')}`, `TASK-${String((topicId - 1) * 3 + 3).padStart(3, '0')}`];
    // For topic 1, use TASK-001, 002, 003
    const tasksForTopic = topicId <= 2 
      ? [`TASK-${String((topicId - 1) * 3 + 1).padStart(3, '0')}`, `TASK-${String((topicId - 1) * 3 + 2).padStart(3, '0')}`, `TASK-${String((topicId - 1) * 3 + 3).padStart(3, '0')}`]
      : topicTasks;
    const allTasksDone = tasksForTopic.every(t => user.completedTasks.includes(t));
    const quizPassed = (user.quizScores[topicId] || 0) >= 6;
    return allTasksDone && quizPassed;
  }, [user]);

  const completeDailyChallenge = useCallback((challengeId: string) => {
    setUser(prev => {
      if (!prev || prev.dailyChallengesCompleted.includes(challengeId)) return prev;
      return {
        ...prev,
        dailyChallengesCompleted: [...prev.dailyChallengesCompleted, challengeId],
        xp: prev.xp + 20,
      };
    });
  }, []);

  const completeRemediation = useCallback((key: string) => {
    setUser(prev => prev ? { ...prev, remediationComplete: { ...prev.remediationComplete, [key]: true } } : null);
  }, []);

  const setWeakTopics = useCallback((topicId: number, subtopics: string[]) => {
    setUser(prev => prev ? { ...prev, weakTopics: { ...prev.weakTopics, [topicId]: subtopics } } : null);
  }, []);

  return (
    <AppContext.Provider value={{
      user, isAuthenticated: !!user,
      login, signup, logout, addXP,
      completeTask, saveQuizScore, saveExamScore,
      completeTopic, markSubtopicRead, readSubtopics,
      isTopicUnlocked, isExamUnlocked,
      completeDailyChallenge, completeRemediation, setWeakTopics,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
