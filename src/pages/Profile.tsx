import { useApp } from '@/context/AppContext';
import { getRoleTitle, getXPLevel, ALL_BADGES } from '@/types';
import { topics } from '@/data/topics';
import { Zap, Flame, BookOpen, CheckCircle2, Trophy, Star, Award } from 'lucide-react';

const skillAreas = [
  { name: 'HTML', topicIds: [2] },
  { name: 'CSS', topicIds: [3] },
  { name: 'JavaScript', topicIds: [4, 5] },
  { name: 'React', topicIds: [6, 7] },
  { name: 'Node.js', topicIds: [10] },
  { name: 'Database', topicIds: [11, 12] },
  { name: 'Git', topicIds: [8] },
  { name: 'Docker', topicIds: [14] },
];

const Profile = () => {
  const { user } = useApp();
  if (!user) return null;

  const role = getRoleTitle(user.completedTopics.length);
  const xpLevel = getXPLevel(user.xp);
  const initials = user.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const goalLabels = { fullstack: 'Full Stack Developer', frontend: 'Frontend Developer', backend: 'Backend Developer', devops: 'DevOps Engineer' };

  const stats = [
    { label: 'Total XP', value: user.xp.toLocaleString(), icon: Zap },
    { label: 'Topics Done', value: user.completedTopics.length, icon: BookOpen },
    { label: 'Tasks Done', value: user.completedTasks.length, icon: CheckCircle2 },
    { label: 'Quizzes Passed', value: Object.keys(user.quizScores).length, icon: Star },
    { label: 'Exams Passed', value: Object.values(user.examScores).filter(s => s >= 11).length, icon: Award },
    { label: 'Current Streak', value: `${user.streak} days`, icon: Flame },
  ];

  return (
    <div className="max-w-4xl mx-auto animate-fade-in space-y-6">
      {/* Profile Header */}
      <div className="glass-card p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-heading font-bold text-2xl shadow-glow">
            {initials}
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-heading font-bold text-foreground">{user.fullName}</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2 justify-center md:justify-start">
              <span className="badge-pill bg-primary/10 text-primary border-primary/30">{role.title}</span>
              <span className="badge-pill bg-secondary/10 text-secondary border-secondary/30">{xpLevel}</span>
              <span className="badge-pill bg-muted text-muted-foreground border-border">{goalLabels[user.goal]}</span>
            </div>
          </div>
        </div>
        {/* Role Card */}
        <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
          <p className="text-sm font-medium text-foreground">🎯 {role.title}</p>
          <p className="text-xs text-muted-foreground mt-1">{role.description}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {stats.map(stat => (
          <div key={stat.label} className="glass-card p-4 text-center">
            <stat.icon className="w-5 h-5 mx-auto mb-1 text-primary" />
            <p className="text-lg font-heading font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-heading font-bold text-foreground mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-warning" /> Badges
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {ALL_BADGES.map(badge => {
            const earned = user.badges.find(b => b.id === badge.id);
            return (
              <div key={badge.id}
                className={`flex items-center gap-3 p-3 rounded-lg border transition ${
                  earned ? 'bg-muted/50 border-primary/20' : 'bg-muted/20 border-border opacity-40'
                }`}>
                <span className="text-2xl">{badge.icon}</span>
                <div>
                  <p className="text-sm font-medium text-foreground">{badge.name}</p>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                  {earned?.earnedAt && (
                    <p className="text-xs text-primary mt-0.5">{new Date(earned.earnedAt).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skills */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-heading font-bold text-foreground mb-4">Skills</h2>
        <div className="space-y-3">
          {skillAreas.map(skill => {
            const completed = skill.topicIds.filter(id => user.completedTopics.includes(id)).length;
            const total = skill.topicIds.length;
            const pct = Math.round((completed / total) * 100);
            return (
              <div key={skill.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground font-medium">{skill.name}</span>
                  <span className="text-muted-foreground">{pct}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-xp rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
