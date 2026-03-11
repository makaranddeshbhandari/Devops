import { useApp } from '@/context/AppContext';
import { topics } from '@/data/topics';
import { Link } from 'react-router-dom';
import { Lock, CheckCircle2, PlayCircle, Circle } from 'lucide-react';

const stages = [
  { num: 1, name: 'Foundations', color: 'text-primary' },
  { num: 2, name: 'JavaScript', color: 'text-warning' },
  { num: 3, name: 'Frontend Framework', color: 'text-secondary' },
  { num: 4, name: 'Tools', color: 'text-success' },
  { num: 5, name: 'Backend', color: 'text-destructive' },
  { num: 6, name: 'Connecting Everything', color: 'text-primary' },
  { num: 7, name: 'Deployment and DevOps', color: 'text-warning' },
];

const Roadmap = () => {
  const { user, isTopicUnlocked } = useApp();
  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">Learning Roadmap</h1>
      <p className="text-muted-foreground mb-8">Your path from zero to full stack developer</p>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-border" />

        {stages.map(stage => {
          const stageTopics = topics.filter(t => t.stageNumber === stage.num);
          return (
            <div key={stage.num} className="mb-8">
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="w-12 md:w-16 h-12 md:h-16 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground font-heading font-bold text-lg shadow-glow">
                  {stage.num}
                </div>
                <div>
                  <h2 className={`text-lg font-heading font-bold ${stage.color}`}>Stage {stage.num}</h2>
                  <p className="text-sm text-muted-foreground">{stage.name}</p>
                </div>
              </div>

              <div className="ml-6 md:ml-8 pl-8 border-l-0 space-y-3">
                {stageTopics.map(topic => {
                  const unlocked = isTopicUnlocked(topic.id);
                  const completed = user.completedTopics.includes(topic.id);
                  const inProgress = unlocked && !completed;

                  return (
                    <Link
                      key={topic.id}
                      to={unlocked ? `/topic/${topic.id}` : '#'}
                      className={`block glass-card p-4 transition-all ${
                        unlocked ? 'hover:-translate-y-0.5 cursor-pointer' : 'opacity-50 cursor-not-allowed'
                      } ${completed ? 'border-[hsl(var(--success))/0.3]' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {completed ? (
                            <CheckCircle2 className="w-6 h-6 text-success" />
                          ) : inProgress ? (
                            <PlayCircle className="w-6 h-6 text-primary" />
                          ) : unlocked ? (
                            <Circle className="w-6 h-6 text-muted-foreground" />
                          ) : (
                            <Lock className="w-6 h-6 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground font-mono">#{topic.id}</span>
                            <h3 className="text-sm font-medium text-foreground truncate">{topic.title}</h3>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {topic.estimatedDays} {topic.estimatedDays === 1 ? 'day' : 'days'} estimated
                          </p>
                        </div>
                        <div>
                          {completed && <span className="badge-easy">Complete</span>}
                          {inProgress && <span className="badge-medium">In Progress</span>}
                          {!unlocked && <span className="badge-pill bg-muted text-muted-foreground border-border">Locked</span>}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Roadmap;
