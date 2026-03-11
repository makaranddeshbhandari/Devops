import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { topics } from '@/data/topics';
import { useState } from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

const WeakTopics = () => {
  const { topicId: topicIdStr } = useParams<{ topicId: string }>();
  const topicId = parseInt(topicIdStr || '1');
  const { user, completeRemediation } = useApp();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, string>>({});

  if (!user) return null;

  const weakSubtopicIds = user.weakTopics[topicId] || [];
  const topic = topics.find(t => t.id === topicId);
  if (!topic) return null;

  const weakSubtopics = topic.subtopics.filter(s => weakSubtopicIds.includes(s.id));

  if (weakSubtopics.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12 animate-fade-in">
        <CheckCircle2 className="w-16 h-16 mx-auto text-success mb-4" />
        <h1 className="text-2xl font-heading font-bold text-foreground mb-2">No Weak Areas!</h1>
        <p className="text-muted-foreground">You're doing great. Go retake the exam.</p>
        <button onClick={() => navigate(`/topic/${topicId}`)}
          className="mt-4 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium">
          Back to Topic
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="w-8 h-8 text-warning" />
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Strengthen Weak Areas</h1>
          <p className="text-sm text-muted-foreground">Review these subtopics and practice before retaking the exam</p>
        </div>
      </div>

      <div className="space-y-6">
        {weakSubtopics.map(sub => {
          const remKey = `${topicId}-${sub.id}`;
          const isDone = user.remediationComplete[remKey];

          return (
            <div key={sub.id} className="glass-card p-6">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-3">📖 {sub.title}</h3>
              <div className="text-sm text-foreground/80 mb-4">
                {sub.content.split('\n\n').slice(0, 2).map((p, i) => <p key={i} className="mb-2">{p}</p>)}
              </div>

              {!isDone ? (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-foreground mb-2">Practice: Explain in your own words</h4>
                  <textarea
                    value={answers[sub.id] || ''}
                    onChange={e => setAnswers(prev => ({ ...prev, [sub.id]: e.target.value }))}
                    placeholder="Write your understanding of this concept..."
                    className="w-full h-24 px-4 py-3 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                  <button
                    onClick={() => { if (answers[sub.id]?.trim()) completeRemediation(remKey); }}
                    className="mt-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
                    Mark Complete
                  </button>
                </div>
              ) : (
                <span className="badge-easy">Reviewed ✓</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <button onClick={() => navigate(`/topic/${topicId}`)}
          className="px-8 py-3 rounded-lg bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:opacity-90 transition">
          Back to Topic — Retake Exam
        </button>
      </div>
    </div>
  );
};

export default WeakTopics;
