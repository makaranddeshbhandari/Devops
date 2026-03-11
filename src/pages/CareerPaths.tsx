import { useApp } from '@/context/AppContext';
import { topics } from '@/data/topics';
import { Route } from 'lucide-react';

const tracks = {
  frontend: {
    title: 'Frontend Developer',
    topicIds: [1, 2, 3, 4, 5, 6, 7, 8, 14],
    description: 'Build beautiful, responsive user interfaces. Focus on HTML, CSS, JavaScript, and React.',
    focus: 'UI building, responsive design, component libraries, performance',
    estimatedWeeks: 8,
    jobTitle: 'Frontend Developer',
  },
  backend: {
    title: 'Backend Developer',
    topicIds: [1, 4, 5, 9, 10, 11, 12, 13, 14],
    description: 'Build servers, APIs, and databases. Master Node.js, Express, SQL, and MongoDB.',
    focus: 'API design, database queries, server setup, authentication',
    estimatedWeeks: 10,
    jobTitle: 'Backend Developer',
  },
  fullstack: {
    title: 'Full Stack Developer',
    topicIds: topics.map(t => t.id),
    description: 'Master both frontend and backend. Build complete applications from start to finish.',
    focus: 'Full application development, deployment, and DevOps',
    estimatedWeeks: 14,
    jobTitle: 'Full Stack Developer',
  },
  devops: {
    title: 'DevOps Engineer',
    topicIds: [1, 4, 8, 9, 10, 14, 15],
    description: 'Master deployment, Docker, CI/CD, and cloud infrastructure.',
    focus: 'Dockerfiles, pipelines, deployment, monitoring',
    estimatedWeeks: 6,
    jobTitle: 'DevOps Engineer',
  },
};

const CareerPaths = () => {
  const { user } = useApp();
  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">Career Paths</h1>
      <p className="text-muted-foreground mb-8">Choose your specialization and follow a focused learning track</p>

      <div className="grid gap-6">
        {Object.entries(tracks).map(([key, track]) => {
          const completedInTrack = track.topicIds.filter(id => user.completedTopics.includes(id)).length;
          const progress = Math.round((completedInTrack / track.topicIds.length) * 100);
          const isUserTrack = user.goal === key;

          return (
            <div key={key} className={`glass-card p-6 ${isUserTrack ? 'border-primary/30 shadow-glow' : ''}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Route className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-heading font-bold text-foreground">{track.title}</h2>
                    {isUserTrack && <span className="badge-pill bg-primary/10 text-primary border-primary/30">Your Path</span>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{track.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-center">
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-lg font-heading font-bold text-foreground">{track.topicIds.length}</p>
                  <p className="text-xs text-muted-foreground">Topics</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-lg font-heading font-bold text-foreground">~{track.estimatedWeeks} weeks</p>
                  <p className="text-xs text-muted-foreground">Estimated</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 col-span-2 md:col-span-1">
                  <p className="text-lg font-heading font-bold text-primary">{track.jobTitle}</p>
                  <p className="text-xs text-muted-foreground">Job Title</p>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Progress</span>
                  <span>{completedInTrack}/{track.topicIds.length} topics</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-xp rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <p className="text-xs text-muted-foreground"><strong>Focus:</strong> {track.focus}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {track.topicIds.map(id => {
                  const t = topics.find(tp => tp.id === id);
                  const done = user.completedTopics.includes(id);
                  return (
                    <span key={id} className={`text-xs px-2 py-1 rounded ${done ? 'bg-[hsl(var(--success)/0.1)] text-success' : 'bg-muted text-muted-foreground'}`}>
                      {t?.title}
                    </span>
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

export default CareerPaths;
