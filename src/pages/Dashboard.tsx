import { useApp } from '@/context/AppContext';
import { getRoleTitle, getXPLevel } from '@/types';
import { topics } from '@/data/topics';
import { Link } from 'react-router-dom';
import { Zap, Flame, BookOpen, CheckCircle2, ArrowRight, Trophy } from 'lucide-react';

const Dashboard = () => {
  const { user } = useApp();
  if (!user) return null;

  const role = getRoleTitle(user.completedTopics.length);
  const xpLevel = getXPLevel(user.xp);
  const totalTopics = 15;
  const progress = Math.round((user.completedTopics.length / totalTopics) * 100);
  
  // Find current topic (first uncompleted)
  const currentTopicId = topics.find(t => !user.completedTopics.includes(t.id))?.id ?? 15;
  const currentTopic = topics.find(t => t.id === currentTopicId);

  const stats = [
    { label: 'Total XP', value: user.xp.toLocaleString(), icon: Zap, color: 'text-primary' },
    { label: 'Day Streak', value: user.streak, icon: Flame, color: 'text-warning' },
    { label: 'Topics Done', value: `${user.completedTopics.length}/${totalTopics}`, icon: BookOpen, color: 'text-success' },
    { label: 'Tasks Done', value: user.completedTasks.length, icon: CheckCircle2, color: 'text-secondary' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      {/* Hero */}
      <div className="glass-card p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              Welcome back, {user.fullName.split(' ')[0]}! 👋
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="badge-pill bg-primary/10 text-primary border-primary/30">{role.title}</span>
              <span className="badge-pill bg-secondary/10 text-secondary border-secondary/30">{xpLevel}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-1">Overall Progress</p>
            <p className="text-2xl font-heading font-bold text-gradient">{progress}%</p>
          </div>
        </div>
        <div className="mt-4 h-3 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-xp rounded-full animate-progress-fill transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="glass-card p-4 text-center hover:-translate-y-0.5 transition-transform">
            <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
            <p className="text-xl md:text-2xl font-heading font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Current Topic */}
      {currentTopic && (
        <div className="glass-card p-6 border-primary/20">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs text-primary font-medium uppercase tracking-wider">Current Topic</p>
              <h2 className="text-xl font-heading font-bold text-foreground mt-1">
                {currentTopic.id}. {currentTopic.title}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">{currentTopic.description}</p>
            </div>
          </div>
          <Link to={`/topic/${currentTopic.id}`}
            className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded-lg bg-gradient-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition shadow-glow">
            Continue Learning <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Recent Badges */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-heading font-bold text-foreground mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-warning" /> Recent Badges
        </h2>
        {user.badges.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {user.badges.slice(-6).map(badge => (
              <div key={badge.id} className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg animate-pop-in">
                <span className="text-2xl">{badge.icon}</span>
                <div>
                  <p className="text-sm font-medium text-foreground">{badge.name}</p>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Complete tasks and quizzes to earn badges!</p>
        )}
      </div>

      {/* Quick Nav */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Roadmap', path: '/roadmap', icon: '🗺️' },
          { label: 'Topics', path: `/topic/${currentTopicId}`, icon: '📚' },
          { label: 'Practice', path: '/practice', icon: '💻' },
          { label: 'Profile', path: '/profile', icon: '👤' },
        ].map(item => (
          <Link key={item.path} to={item.path}
            className="glass-card p-4 text-center hover:-translate-y-0.5 transition-transform group">
            <span className="text-2xl">{item.icon}</span>
            <p className="text-sm font-medium text-foreground mt-2 group-hover:text-primary transition">{item.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
