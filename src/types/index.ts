export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  goal: 'fullstack' | 'frontend' | 'backend' | 'devops';
  company: string;
  xp: number;
  streak: number;
  longestStreak: number;
  lastVisit: string;
  createdAt: string;
  completedTopics: number[];
  completedTasks: string[];
  quizScores: Record<number, number>;
  examScores: Record<number, number>;
  examAttempts: Record<number, ExamAttempt[]>;
  badges: Badge[];
  weakTopics: Record<number, string[]>;
  remediationComplete: Record<string, boolean>;
  dailyChallengesCompleted: string[];
  companyTasksCompleted: number;
  tasksSinceCompanyRotation: number;
}

export interface ExamAttempt {
  score: number;
  total: number;
  date: string;
  wrongQuestions: number[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
}

export interface Topic {
  id: number;
  title: string;
  stage: string;
  stageNumber: number;
  estimatedDays: number;
  description: string;
  subtopics: Subtopic[];
}

export interface Subtopic {
  id: string;
  title: string;
  content: string;
  codeExample?: string;
}

export interface Task {
  id: string;
  topicId: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
  company: string;
  scenario: string;
  instructions: string[];
  acceptanceCriteria: string[];
  codeStarter?: string;
  hints: string[];
  xpReward: number;
}

export interface QuizQuestion {
  id: number;
  topicId: number;
  subtopicId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface DailyChallenge {
  id: string;
  topicId: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  problem: string;
  exampleInput?: string;
  exampleOutput?: string;
  hints: string[];
  xpReward: number;
}

export interface CompanyTicket {
  id: string;
  company: string;
  title: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  acceptanceCriteria: string[];
  xpReward: number;
  requiredLevel: number;
}

export const COMPANIES = [
  'TechFlow Inc',
  'BuildFast Ltd',
  'DataCore Systems',
  'CloudNine Solutions',
  'StartupX',
] as const;

export const ROLE_TITLES: Record<string, { min: number; max: number; title: string; description: string }> = {
  beginner: { min: 0, max: 2, title: 'Beginner', description: 'Just starting the journey into web development.' },
  webFundamentals: { min: 3, max: 4, title: 'Web Fundamentals Developer', description: 'Understands the core building blocks of the web.' },
  frontend: { min: 5, max: 6, title: 'Frontend Developer', description: 'Can build beautiful user interfaces with HTML, CSS, and JavaScript.' },
  javascript: { min: 7, max: 8, title: 'JavaScript Developer', description: 'Proficient in modern JavaScript and React framework.' },
  react: { min: 9, max: 10, title: 'React Developer', description: 'Builds complex single-page applications with React ecosystem.' },
  backend: { min: 11, max: 12, title: 'Backend Developer', description: 'Creates APIs, manages databases, and builds server-side logic.' },
  fullstack: { min: 13, max: 14, title: 'Full Stack Developer', description: 'Builds complete web applications from frontend to backend.' },
  senior: { min: 15, max: 15, title: 'Senior Full Stack Developer', description: 'Masters all aspects of web development, deployment, and architecture.' },
};

export const XP_LEVELS = [
  { min: 0, max: 200, title: 'Beginner' },
  { min: 201, max: 500, title: 'Apprentice Dev' },
  { min: 501, max: 1000, title: 'Junior Developer' },
  { min: 1001, max: 2000, title: 'Mid-Level Developer' },
  { min: 2001, max: 4000, title: 'Senior Developer' },
  { min: 4001, max: Infinity, title: 'Full Stack Architect' },
];

export const ALL_BADGES: Badge[] = [
  { id: 'first-step', name: 'First Step', description: 'Complete your first task', icon: '🚀' },
  { id: 'quiz-master', name: 'Quiz Master', description: 'Score 100% on any quiz', icon: '🧠' },
  { id: 'streak-7', name: 'Streak 7', description: '7 day learning streak', icon: '🔥' },
  { id: 'streak-30', name: 'Streak 30', description: '30 day learning streak', icon: '💎' },
  { id: 'html-hero', name: 'HTML Hero', description: 'Complete HTML topic', icon: '📝' },
  { id: 'css-champion', name: 'CSS Champion', description: 'Complete CSS topic', icon: '🎨' },
  { id: 'js-warrior', name: 'JS Warrior', description: 'Complete JavaScript Basics', icon: '⚡' },
  { id: 'react-ranger', name: 'React Ranger', description: 'Complete React Basics', icon: '⚛️' },
  { id: 'git-guardian', name: 'Git Guardian', description: 'Complete Git topic', icon: '🔀' },
  { id: 'backend-builder', name: 'Backend Builder', description: 'Complete Node.js topic', icon: '🏗️' },
  { id: 'database-duke', name: 'Database Duke', description: 'Complete both database topics', icon: '🗄️' },
  { id: 'fullstack-fighter', name: 'Full Stack Fighter', description: 'Complete all 15 topics', icon: '🏆' },
  { id: 'speed-learner', name: 'Speed Learner', description: 'Complete a topic faster than estimated', icon: '⚡' },
  { id: 'perfect-exam', name: 'Perfect Exam', description: 'Score 100% on any exam', icon: '💯' },
];

export function getRoleTitle(completedCount: number): { title: string; description: string } {
  for (const role of Object.values(ROLE_TITLES)) {
    if (completedCount >= role.min && completedCount <= role.max) {
      return { title: role.title, description: role.description };
    }
  }
  return { title: 'Beginner', description: 'Just starting out.' };
}

export function getXPLevel(xp: number): string {
  for (const level of XP_LEVELS) {
    if (xp >= level.min && xp <= level.max) return level.title;
  }
  return 'Beginner';
}
