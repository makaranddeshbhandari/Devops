import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { dailyChallenges } from '@/data/tasks';
import { topics } from '@/data/topics';
import { Flame, Filter, Zap } from 'lucide-react';

const Practice = () => {
  const { user, completeDailyChallenge } = useApp();
  const [topicFilter, setTopicFilter] = useState<number | 'all'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [solutions, setSolutions] = useState<Record<string, string>>({});
  const [expandedHints, setExpandedHints] = useState<Record<string, boolean>>({});

  if (!user) return null;

  const filtered = dailyChallenges.filter(c => {
    if (topicFilter !== 'all' && c.topicId !== topicFilter) return false;
    if (difficultyFilter !== 'all' && c.difficulty !== difficultyFilter) return false;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Practice</h1>
          <p className="text-muted-foreground text-sm">Daily coding challenges to sharpen your skills</p>
        </div>
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-warning" />
          <span className="font-heading font-bold text-foreground">{user.streak} day streak</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select value={topicFilter} onChange={e => setTopicFilter(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
            className="px-3 py-1.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
            <option value="all">All Topics</option>
            {topics.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
          </select>
        </div>
        <select value={difficultyFilter} onChange={e => setDifficultyFilter(e.target.value)}
          className="px-3 py-1.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
          <option value="all">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="space-y-4">
        {filtered.map(challenge => {
          const isDone = user.dailyChallengesCompleted.includes(challenge.id);
          return (
            <div key={challenge.id} className={`glass-card p-6 ${isDone ? 'border-[hsl(var(--success))/0.3]' : ''}`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-semibold text-foreground">{challenge.title}</h3>
                <div className="flex items-center gap-2">
                  <span className={challenge.difficulty === 'Easy' ? 'badge-easy' : challenge.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'}>
                    {challenge.difficulty}
                  </span>
                  {isDone && <span className="badge-easy">Done ✓</span>}
                </div>
              </div>
              <p className="text-sm text-foreground/80 mb-3">{challenge.problem}</p>
              {challenge.exampleInput && (
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="code-block text-xs"><span className="text-muted-foreground">Input:</span> {challenge.exampleInput}</div>
                  <div className="code-block text-xs"><span className="text-muted-foreground">Output:</span> {challenge.exampleOutput}</div>
                </div>
              )}
              <button onClick={() => setExpandedHints(prev => ({ ...prev, [challenge.id]: !prev[challenge.id] }))}
                className="text-xs text-muted-foreground hover:text-foreground mb-3">
                {expandedHints[challenge.id] ? '▼' : '▶'} Hints
              </button>
              {expandedHints[challenge.id] && (
                <ul className="text-sm text-muted-foreground space-y-1 mb-3">
                  {challenge.hints.map((h, i) => <li key={i}>💡 {h}</li>)}
                </ul>
              )}
              {!isDone && (
                <div>
                  <textarea
                    value={solutions[challenge.id] || ''}
                    onChange={e => setSolutions(prev => ({ ...prev, [challenge.id]: e.target.value }))}
                    placeholder="Write your solution..."
                    className="w-full h-24 px-4 py-3 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none font-mono"
                  />
                  <button onClick={() => { if (solutions[challenge.id]?.trim()) completeDailyChallenge(challenge.id); }}
                    className="mt-2 px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold shadow-glow hover:opacity-90 transition flex items-center gap-1">
                    <Zap className="w-4 h-4" /> Submit (+20 XP)
                  </button>
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && <p className="text-center text-muted-foreground py-8">No challenges match your filters.</p>}
      </div>
    </div>
  );
};

export default Practice;
